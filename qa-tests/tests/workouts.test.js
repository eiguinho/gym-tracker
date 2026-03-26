require('dotenv').config();
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Fluxo de Meus Treinos - GymTracker', () => {
  let driver;

  beforeAll(async () => {
    let options = new chrome.Options();
    options.addArguments('--headless=new'); 
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await driver.get('http://localhost:3000/');
    await driver.wait(until.elementLocated(By.css('input[type="email"]')), 15000).sendKeys(process.env.TEST_EMAIL);
    await driver.findElement(By.css('input[type="password"]')).sendKeys(process.env.TEST_PASSWORD);
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlContains('/dashboard'), 15000);

    await driver.get('http://localhost:3000/dashboard/profile');
    let selects = await driver.wait(until.elementsLocated(By.css('select')), 5000);
    if (selects.length >= 2) {
      await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", selects[0]);
      await selects[0].sendKeys('Iniciante');
      await selects[1].sendKeys('Full Body');
      let submitBtn = await driver.findElement(By.css('button[type="submit"]'));
      await submitBtn.click();
      await driver.sleep(1500);
    }
  });

  async function confirmAlertModal(driver) {
  let confirmBtn = await driver.wait(
    until.elementLocated(By.xpath("//button[contains(., 'Sim, excluir')]")), 
    5000
  );
  await driver.executeScript("arguments[0].click();", confirmBtn);
}

  beforeEach(async () => {
    await driver.get('http://localhost:3000/dashboard/workouts'); 
    await driver.sleep(1500); 
  });

  afterAll(async () => {
    await driver.quit();
  });

  const openCreateModal = async () => {
    let createButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(., 'Novo Treino') or contains(., 'Criar primeiro')]")),
      10000
    );
    await driver.sleep(500); 
    await createButton.click();
    await driver.wait(until.elementLocated(By.css('input[placeholder="Ex: Treino A - Peito e Tríceps"]')), 5000);
  };

  it('1. Deve exibir aviso ao tentar salvar sem nome do treino', async () => {
    await openCreateModal();
    let submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    let nameInput = await driver.findElement(By.css('input[placeholder="Ex: Treino A - Peito e Tríceps"]')); 
    let validationMsg = await nameInput.getAttribute('validationMessage');
    
    expect(validationMsg).toMatch(/(Preencha|fill out)/i);
  });

  it('2. Deve exibir aviso se não selecionar o exercício', async () => {
    await openCreateModal();
    let nameInput = await driver.findElement(By.css('input[placeholder="Ex: Treino A - Peito e Tríceps"]')); 
    await nameInput.sendKeys('Treino Teste Select');

    let submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    let selectElement = await driver.findElement(By.css('select'));
    let validationMsg = await selectElement.getAttribute('validationMessage');
    
    expect(validationMsg).toMatch(/(Selecione|select)/i);
  });

  it('3. Deve exibir aviso de séries maiores que 10 e menores que 1', async () => {
    await openCreateModal();
    let setsInput = await driver.findElement(By.css('input[max="10"]')); 
    let submitButton = await driver.findElement(By.css('button[type="submit"]'));

    await setsInput.clear();
    await setsInput.sendKeys('11');
    await submitButton.click();
    let maxMsg = await setsInput.getAttribute('validationMessage');
    expect(maxMsg).toMatch(/10/); 

    await setsInput.clear();
    await setsInput.sendKeys('0');
    await submitButton.click();
    let minMsg = await setsInput.getAttribute('validationMessage');
    expect(minMsg).toMatch(/1/); 
  });

  it('4. Deve exibir aviso de repetições maiores que 40 e menores que 1', async () => {
    await openCreateModal();
    let minRepsInput = await driver.findElement(By.css('input[placeholder="8"]')); 
    let submitButton = await driver.findElement(By.css('button[type="submit"]'));

    await minRepsInput.clear();
    await minRepsInput.sendKeys('41');
    await submitButton.click();
    let maxMsg = await minRepsInput.getAttribute('validationMessage');
    expect(maxMsg).toMatch(/40/);

    await minRepsInput.clear();
    await minRepsInput.sendKeys('0');
    await submitButton.click();
    let minMsg = await minRepsInput.getAttribute('validationMessage');
    expect(minMsg).toMatch(/1/);
  });

  it('5. Deve fechar o modal ao clicar em Cancelar sem salvar nada', async () => {
    await openCreateModal();
    let cancelButton = await driver.findElement(By.xpath("//button[contains(text(), 'Cancelar')]"));
    await cancelButton.click();
    
    await driver.sleep(1000); 
    let submitButtons = await driver.findElements(By.css('button[type="submit"]'));
    expect(submitButtons.length).toBe(0);
  });

  it('6. Deve criar um treino com sucesso e exibir o Toast', async () => {
    await openCreateModal();
    let nameInput = await driver.findElement(By.css('input[placeholder="Ex: Treino A - Peito e Tríceps"]')); 
    await nameInput.sendKeys('Treino de QA Automatizado');

    let selectElement = await driver.findElement(By.css('select'));

    await driver.wait(async () => {
      let options = await selectElement.findElements(By.css('option'));
      return options.length > 1; 
    }, 10000, 'A API demorou demais para carregar os exercícios');

    let options = await selectElement.findElements(By.css('option'));
    await options[1].click(); 

    let submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    let toast = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Nova rotina de treino criada!')]")), 
      10000
    );
    expect(await toast.getAttribute('textContent')).toBeTruthy();
  });

  it('7. Deve editar o treino recém criado com sucesso', async () => {
    let editButton = await driver.wait(
      until.elementLocated(By.xpath("//button[@title='Editar treino']")),
      10000
    );
    await editButton.click();
    
    let nameInput = await driver.wait(
      until.elementLocated(By.css('input[placeholder="Ex: Treino A - Peito e Tríceps"]')),
      10000 
    );
    
    await nameInput.clear();
    await nameInput.sendKeys('Treino Editado pelo QA');

    let submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    let toast = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Treino atualizado com sucesso!')]")), 
      10000
    );
    expect(await toast.getAttribute('textContent')).toBeTruthy();
  });

  it('8. Deve excluir o treino lidando com o alerta do navegador', async () => {
    let deleteButton = await driver.wait(
      until.elementLocated(By.xpath("//button[@title='Excluir treino']")),
      5000
    );
    await driver.executeScript("arguments[0].click();", deleteButton);

    await confirmAlertModal(driver);

    let toast = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Treino excluído permanentemente!')]")), 
      8000
    );
    expect(await toast.getText()).toBeTruthy();
  });

  it('9. Sugestões: Deve navegar até a aba e clonar um programa de treino com sucesso', async () => {
    let coachTab = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(., 'Sugestões')]")),
      5000
    );
    await coachTab.click();
    await driver.sleep(2000);

    let cloneButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(., 'Usar este Treino')]")),
      10000
    );
    
    await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", cloneButton);
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", cloneButton);

    let toastClone = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Rotina copiada com sucesso')]")), 
      10000
    );
    expect(await toastClone.getText()).toBeTruthy();

    let myRoutineTab = await driver.wait(until.elementLocated(By.xpath("//button[contains(., 'Minha Rotina')]")), 5000);
    let tabClasses = await myRoutineTab.getAttribute('class');
    expect(tabClasses).toContain('border-indigo-600');

    let deleteBtns = await driver.findElements(By.xpath("//button[@title='Excluir treino']"));
    if (deleteBtns.length > 0) {
       await driver.executeScript("arguments[0].click();", deleteBtns[0]);
       
       await confirmAlertModal(driver);
       
       await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'excluído')]")), 5000);
    }
  }, 15000);
});