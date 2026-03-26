require('dotenv').config();
const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Fluxo do Calendário - GymTracker', () => {
  let driver;

  beforeAll(async () => {
    let options = new chrome.Options();
    options.addArguments('--headless=new');
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--window-size=1920,1080');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await driver.get('http://localhost:3000/');
    
    await driver.wait(until.elementLocated(By.css('input[type="email"]')), 15000).sendKeys(process.env.TEST_EMAIL);
    await driver.findElement(By.css('input[type="password"]')).sendKeys(process.env.TEST_PASSWORD);
    await driver.findElement(By.css('button[type="submit"]')).click();
    
    await driver.wait(until.urlContains('/dashboard'), 15000);

    try {
      let onboarding = await driver.wait(until.elementLocated(By.xpath("//h2[contains(., 'Bem-vindo')]")), 5000);
      if (onboarding) {
        let startBtn = await driver.findElement(By.xpath("//button[contains(., 'Começar Minha Jornada')]"));
        await driver.executeScript("arguments[0].click();", startBtn);
        await driver.sleep(1000);
      }
    } catch (e) {}
  });

  async function confirmAlertModal(driver) {
  let confirmBtn = await driver.wait(
    until.elementLocated(By.xpath("//button[contains(., 'Confirmar') or contains(., 'remover')]")), 
    5000
  );
  await driver.executeScript("arguments[0].click();", confirmBtn);
  await driver.sleep(2000); 
}

  beforeEach(async () => {
    await driver.get('http://localhost:3000/dashboard/calendar'); 
    await driver.sleep(2500);
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('1. Deve navegar entre os meses no calendário', async () => {
    let navButtons = await driver.wait(until.elementsLocated(By.css('button.rounded-lg.text-gray-600')), 5000);
    await driver.executeScript("arguments[0].click();", navButtons[1]);
    
    let titleElement = await driver.findElement(By.css("h2.capitalize"));
    await driver.wait(until.elementTextContains(titleElement, ''), 5000);
    
    await driver.executeScript("arguments[0].click();", navButtons[0]);
    await driver.sleep(1000);
  });

  it('2. Deve registrar qualidade de sono no dia de hoje e validar a Lua', async () => {
    const dayNumber = new Date().getDate().toString();

    let dayCell = await driver.wait(until.elementLocated(By.xpath(
      `//div[not(contains(@class, 'opacity'))]//span[text()='${dayNumber}']/ancestor::div[1]`
    )), 5000);
    
    await dayCell.click();
    await driver.sleep(500);

    let sleepBtn = await driver.wait(
      until.elementLocated(By.xpath(`//div[not(contains(@class, 'opacity'))]//span[text()='${dayNumber}']/ancestor::div[1]//button[@title='Registrar sono']`)), 
      8000
    );
    await driver.executeScript("arguments[0].click();", sleepBtn);

    let inputs = await driver.wait(until.elementsLocated(By.css("input[type='time']")), 5000);
    await inputs[0].sendKeys('22', '30');
    await inputs[1].sendKeys('06', '30');

    await (await driver.findElement(By.xpath("//button[contains(., 'Bem')]"))).click();
    await driver.findElement(By.xpath("//button[contains(., 'Salvar Registro')]")).click();

    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Dados de sono registrados!')]")), 5000);
    
    await driver.navigate().refresh();
    await driver.sleep(3000);

    let luaAmarela = await driver.wait(
      until.elementLocated(By.css(".text-yellow-500, svg.fill-current.text-yellow-500")), 
      8000
    );
    expect(luaAmarela).toBeTruthy();
  });

  it('3. Deve agendar um treino para o dia atual via modal', async () => {
    const dayNumber = new Date().getDate().toString();
    let todayCell = await driver.wait(until.elementLocated(By.xpath(
      `//div[not(contains(@class, 'opacity'))]//span[text()='${dayNumber}']/ancestor::div[1]`
    )), 5000);
    await driver.executeScript("arguments[0].click();", todayCell);
    await driver.sleep(1000);

    let addBtn = await driver.wait(until.elementLocated(By.xpath("//button[contains(., 'Adicionar Treino')]")), 5000);
    await driver.executeScript("arguments[0].click();", addBtn);
    
    let firstWorkout = await driver.wait(until.elementLocated(By.css("button h4")), 10000);
    await driver.executeScript("arguments[0].click();", firstWorkout);
    
    await driver.sleep(2000);
    let log = await driver.wait(until.elementLocated(By.css('button[title="Remover do calendário"]')), 5000);
    expect(log).toBeTruthy();
  });

  it('4. Deve validar duração vazia e limite de 300 minutos no Check-in', async () => {
    let scheduledLogCard = await driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'cursor-pointer') and .//button[@title='Remover do calendário']]")), 10000);
    await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", scheduledLogCard);
    await driver.sleep(800);
    await scheduledLogCard.click();

    let durationInput = await driver.wait(until.elementLocated(By.css("input[type='number']")), 10000);

    await durationInput.sendKeys(Key.CONTROL, 'a');
    await durationInput.sendKeys(Key.BACK_SPACE);
    
    let submitBtn = await driver.findElement(By.css('button[type="submit"]'));
    await submitBtn.click();
    
    await driver.sleep(1000);
    let emptyMsg = await durationInput.getAttribute('validationMessage');
    expect(emptyMsg).toMatch(/(Preencha|fill out)/i);

    await durationInput.sendKeys('301');
    await submitBtn.click();
    let maxMsg = await durationInput.getAttribute('validationMessage');
    expect(maxMsg).toMatch(/300/);

    let cancelBtn = await driver.findElement(By.xpath("//button[contains(., 'Cancelar')]"));
    await cancelBtn.click();
    await driver.sleep(1000);
  });

  it('5. Deve fazer check-in e concluir um treino agendado', async () => {
    let scheduledLogCard = await driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'cursor-pointer') and .//button[@title='Remover do calendário']]")), 10000);
    await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", scheduledLogCard);
    await driver.sleep(800);
    await scheduledLogCard.click();

    let durationInput = await driver.wait(until.elementLocated(By.css("input[type='number']")), 10000);
    await durationInput.sendKeys(Key.CONTROL, 'a');
    await durationInput.sendKeys(Key.BACK_SPACE);
    await durationInput.sendKeys('45'); 

    let completeBtn = await driver.findElement(By.xpath("//button[contains(., 'Concluir Treino')]"));
    await completeBtn.click();

    let toast = await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Check-in realizado!')]")), 10000);
    expect(await toast.getText()).toBeTruthy();
    await driver.sleep(1000);
  });

  it('6. Deve desmarcar (Undo) um treino concluído', async () => {
    let completedLogCard = await driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'cursor-pointer') and .//button[@title='Remover do calendário']]")), 10000);
    await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", completedLogCard);
    await driver.sleep(800);
    await completedLogCard.click();

    let undoBtn = await driver.wait(until.elementLocated(By.xpath("//button[contains(., 'Desmarcar')]")), 10000);
    await undoBtn.click();

    let toast = await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Treino desmarcado!')]")), 10000);
    expect(await toast.getText()).toBeTruthy();
    await driver.sleep(1000);
  });

  it('7. Deve excluir o registro de sono do Resumo do Dia lidando com Alerta', async () => {
    let cellWithSleep = await driver.wait(
      until.elementLocated(By.xpath("//div[contains(@class, 'cursor-pointer') and .//button[contains(@class, 'text-yellow-500')]]")),
      8000
    );
    await driver.executeScript("arguments[0].click();", cellWithSleep);
    await driver.sleep(1500); 

    let deleteSleepBtn = await driver.wait(until.elementLocated(By.xpath("//button[@title='Excluir registro de sono']")), 5000);
    await driver.executeScript("arguments[0].click();", deleteSleepBtn);

    await confirmAlertModal(driver);

    let emptySleepText = await driver.wait(until.elementLocated(By.xpath("//p[contains(text(), 'Nenhum registro de sono')]")), 5000);
    expect(emptySleepText).toBeTruthy();
  });

  it('8. Deve excluir o treino agendado do Resumo do Dia lidando com Alerta', async () => {
    const dayNumber = new Date().getDate().toString();
    let todayCell = await driver.wait(
      until.elementLocated(By.xpath(`//div[not(contains(@class, 'opacity'))]//span[text()='${dayNumber}']/ancestor::div[1]`)),
      5000
    );
    await driver.executeScript("arguments[0].click();", todayCell);
    await driver.sleep(1500); 

    let deleteWorkoutBtn = await driver.wait(until.elementLocated(By.xpath("//button[@title='Excluir treino']")), 5000);
    await driver.executeScript("arguments[0].click();", deleteWorkoutBtn);

    await confirmAlertModal(driver);

    let emptyStateText = await driver.wait(until.elementLocated(By.xpath("//p[contains(text(), 'Você ainda não preparou um treino')]")), 5000);
    expect(emptyStateText).toBeTruthy();
  });

  it('9. Deve excluir o treino diretamente pelo card do calendário lidando com PointerEvent', async () => {
    let addWorkoutBtn = await driver.wait(until.elementLocated(By.xpath("//button[contains(., 'Adicionar Treino')]")), 5000);
    await driver.executeScript("arguments[0].click();", addWorkoutBtn);
    let firstWorkoutOption = await driver.wait(until.elementLocated(By.xpath("//button[.//h4]")), 5000);
    await driver.executeScript("arguments[0].click();", firstWorkoutOption);
    await driver.sleep(2000); 

    let removeFromCalendarBtn = await driver.wait(until.elementLocated(By.xpath("//button[@title='Remover do calendário']")), 5000);
    
    await driver.executeScript("arguments[0].dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));", removeFromCalendarBtn);

    await confirmAlertModal(driver);

    let logsAfterDelete = await driver.findElements(By.xpath("//button[@title='Remover do calendário']"));
    expect(logsAfterDelete.length).toBe(0);
  });
  
});