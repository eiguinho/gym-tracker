require('dotenv').config();
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome'); 

describe('Fluxo de Login - GymTracker', () => {
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
  });

  beforeEach(async () => {
    await driver.get('http://localhost:3000');
    await driver.sleep(1000); 
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('1. Deve exibir aviso nativo ao tentar logar com campos vazios', async () => {
    let submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    let emailInput = await driver.findElement(By.css('input[type="email"]'));
    let validationMsg = await emailInput.getAttribute('validationMessage');
    
    expect(validationMsg).not.toBe('');
  });

  it('2. Deve exibir Toast de erro ao usar credenciais inválidas', async () => {
    let emailInput = await driver.findElement(By.css('input[type="email"]'));
    let passwordInput = await driver.findElement(By.css('input[type="password"]'));
    let submitButton = await driver.findElement(By.css('button[type="submit"]'));

    await emailInput.sendKeys('errado@gmail.com');
    await passwordInput.sendKeys('senhaerrada123');
    await submitButton.click();

    let toast = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'E-mail ou senha inválidos') or contains(text(), 'Falha na autenticação')]")), 
      5000
    );
    
    let toastText = await toast.getAttribute('textContent');
    expect(toastText).toBeTruthy();
  });

  it('3. Deve logar com sucesso e redirecionar para o Dashboard', async () => {
    let emailInput = await driver.findElement(By.css('input[type="email"]'));
    let passwordInput = await driver.findElement(By.css('input[type="password"]'));
    let submitButton = await driver.findElement(By.css('button[type="submit"]'));

    await emailInput.sendKeys(process.env.TEST_EMAIL);
    await passwordInput.sendKeys(process.env.TEST_PASSWORD);
    await submitButton.click();

    await driver.wait(until.urlContains('/dashboard'), 5000);
    let currentUrl = await driver.getCurrentUrl();
    
    expect(currentUrl).toContain('/dashboard');
  });
});