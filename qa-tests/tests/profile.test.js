require('dotenv').config();
const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Fluxo de Perfil e Logout - GymTracker', () => {
  let driver;
  let tempEmail;
  const tempPass = 'senhaForte123';

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
  });

  beforeEach(async () => {
    const url = await driver.getCurrentUrl();
    if (url.includes('/dashboard') && !url.includes('/profile')) {
      await driver.get('http://localhost:3000/dashboard/profile');
      await driver.sleep(1500);
    }
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('0. Deve registrar e verificar um usuário novo (Setup para testes de perfil)', async () => {
    tempEmail = `qa_profile_test_${Date.now()}@gymtracker.com`;

    await driver.get('http://localhost:3000/register');
    await driver.findElement(By.xpath("//input[@placeholder='João da Silva']")).sendKeys('Igor QA Profile');
    await driver.findElement(By.css('input[type="email"]')).sendKeys(tempEmail);
    await driver.findElement(By.css('input[type="password"]')).sendKeys(tempPass);
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlContains('/verify'), 10000);
    
    let codeInput = await driver.wait(until.elementLocated(By.css('input')), 5000);
    await codeInput.sendKeys('999999');
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlContains('/dashboard'), 10000);

    let startJourneyBtn = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(., 'Começar Minha Jornada')]")),
      10000
    );
    await driver.sleep(1000);
    await startJourneyBtn.click();
    
    await driver.wait(until.stalenessOf(startJourneyBtn), 5000);
  });

  it('1. Deve exibir aviso ao tentar salvar com nome vazio', async () => {
    await driver.get('http://localhost:3000/dashboard/profile');
    let nameInput = await driver.wait(until.elementLocated(By.css('input')), 5000);
    await nameInput.sendKeys(Key.CONTROL, 'a', Key.BACK_SPACE);

    let submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", submitButton);
    await driver.sleep(500);
    await submitButton.click();

    let validationMsg = await nameInput.getAttribute('validationMessage');
    expect(validationMsg).toMatch(/(Preencha|fill out)/i);
  });

  it('2. Deve atualizar o nome, preferencias e o avatar com sucesso e exibir o Toast', async () => {
    let nameInput = await driver.findElement(By.css('input'));
    await nameInput.sendKeys(Key.CONTROL, 'a', Key.BACK_SPACE);
    await nameInput.sendKeys('Igor Editado QA');

    let avatarButtons = await driver.findElements(By.css('button.h-16.w-16'));
    if (avatarButtons.length > 1) {
      await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", avatarButtons[1]);
      await driver.sleep(500); 
      await avatarButtons[1].click(); 
    }

    let selects = await driver.findElements(By.css('select'));
    if (selects.length >= 2) {
      await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", selects[0]);
      await selects[0].sendKeys('Iniciante');
      await selects[1].sendKeys('Força');
    }

    let submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", submitButton);
    await driver.sleep(500);
    await submitButton.click();

    let toast = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Perfil atualizado')]")), 
      5000
    );
    expect(await toast.getAttribute('textContent')).toBeTruthy();
    
    await driver.wait(until.stalenessOf(toast), 5000);
  }, 10000);

  it('3. Deve persistir as preferências de Nível e Foco após recarregar a página', async () => {
    await driver.get('http://localhost:3000/dashboard/profile');
    await driver.sleep(1500);

    let selects = await driver.findElements(By.css('select'));
    expect(selects.length).toBeGreaterThanOrEqual(2);

    let levelValue = await selects[0].getAttribute('value');
    let focusValue = await selects[1].getAttribute('value');

    expect(levelValue).toBe('Iniciante');
    expect(focusValue).toBe('Força');
  });

  it('4. Deve fazer logout e redirecionar para a tela inicial', async () => {
    let headerProfileButton = await driver.wait(
      until.elementLocated(By.css("header .relative button")),
      5000
    );
    
    await driver.executeScript("arguments[0].click();", headerProfileButton);

    let logoutButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(., 'Sair')]")),
      5000
    );
    await logoutButton.click();

    await driver.wait(until.urlIs('http://localhost:3000/'), 5000);
    expect(await driver.getCurrentUrl()).toBe('http://localhost:3000/');
  });

  it('5. Deve logar novamente com a conta criada para testar a exclusão', async () => {
    await driver.get('http://localhost:3000/');
    let emailInput = await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);
    await emailInput.sendKeys(tempEmail);

    await driver.findElement(By.css('input[type="password"]')).sendKeys(tempPass);
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlContains('/dashboard'), 10000);
    
  });

  it('6. Deve cancelar a exclusão da conta ao clicar em Cancelar no alerta', async () => {
    await driver.get('http://localhost:3000/dashboard/profile');
    
    let deleteBtn = await driver.wait(until.elementLocated(By.xpath("//button[contains(., 'Excluir Conta')]")), 8000);
    await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", deleteBtn);
    await driver.sleep(500);
    
    // Abre o modal
    await driver.executeScript("arguments[0].click();", deleteBtn);

    // Espera o botão Cancelar do seu modal aparecer e clica
    let cancelBtn = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(., 'Cancelar')]")), 
      5000
    );
    await driver.executeScript("arguments[0].click();", cancelBtn);

    // Garante que o modal fechou e continuamos no profile
    await driver.sleep(1000);
    expect(await driver.getCurrentUrl()).toContain('/dashboard/profile');
  });

  it('7. Deve excluir a conta permanentemente ao clicar em OK no alerta', async () => {
    // Localiza o botão de excluir novamente (garantindo que o DOM está fresco)
    let deleteBtn = await driver.wait(until.elementLocated(By.xpath("//button[contains(., 'Excluir Conta')]")), 5000);
    await driver.executeScript("arguments[0].click();", deleteBtn);

    // Espera o botão de confirmação com o texto exato que você passou
    let confirmBtn = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(., 'Sim, excluir minha conta')]")), 
      5000
    );
    
    // Confirma a exclusão
    await driver.executeScript("arguments[0].click();", confirmBtn);

    // Espera o redirecionamento para a Home (página de login/landing)
    await driver.wait(until.urlIs('http://localhost:3000/'), 15000);
    expect(await driver.getCurrentUrl()).toBe('http://localhost:3000/');
  });
});