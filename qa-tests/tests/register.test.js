require('dotenv').config();
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome'); 

describe('Fluxo de Cadastro - GymTracker', () => {
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
    await driver.get('http://localhost:3000/register');
    await driver.sleep(1000);
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('1. Deve exibir aviso nativo para senha com menos de 6 caracteres', async () => {
    let nameInput = await driver.findElement(By.xpath("//input[@placeholder='João da Silva']"));
    let emailInput = await driver.findElement(By.css('input[type="email"]'));
    let passwordInput = await driver.findElement(By.css('input[type="password"]'));
    let submitButton = await driver.findElement(By.css('button[type="submit"]'));

    await nameInput.sendKeys('Usuário Teste');
    await emailInput.sendKeys('teste@gmail.com');
    await passwordInput.sendKeys('123');
    await submitButton.click();

    let validationMsg = await passwordInput.getAttribute('validationMessage');
    expect(validationMsg).toMatch(/6 caracteres/i);
  });

  it('2. Deve exibir Toast de erro se o e-mail já estiver em uso', async () => {
    let nameInput = await driver.findElement(By.xpath("//input[@placeholder='João da Silva']"));
    let emailInput = await driver.findElement(By.css('input[type="email"]'));
    let passwordInput = await driver.findElement(By.css('input[type="password"]'));
    let submitButton = await driver.findElement(By.css('button[type="submit"]'));

    await nameInput.sendKeys('Usuário Existente');
    await emailInput.sendKeys(process.env.TEST_EMAIL); 
    await passwordInput.sendKeys('123456');
    await submitButton.click();

    let toast = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Este e-mail já está em uso') or contains(text(), 'Erro')]")), 
      5000
    );
    let toastText = await toast.getAttribute('textContent');
    expect(toastText).toBeTruthy();
  });

  it('3. Deve criar conta com sucesso e pedir verificação', async () => {
    let nameInput = await driver.findElement(By.xpath("//input[@placeholder='João da Silva']"));
    let emailInput = await driver.findElement(By.css('input[type="email"]'));
    let passwordInput = await driver.findElement(By.css('input[type="password"]'));
    let submitButton = await driver.findElement(By.css('button[type="submit"]'));

    const emailDinamico = `qa_teste_${Date.now()}@gymtracker.com`;

    await nameInput.sendKeys('Usuário QA Automático');
    await emailInput.sendKeys(emailDinamico);
    await passwordInput.sendKeys('senhaForte123');
    await submitButton.click();

    let toast = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Conta criada!')]")), 
      5000
    );
    
    await driver.wait(until.urlContains('/verify'), 5000);
    let currentUrl = await driver.getCurrentUrl();
    
    let toastText = await toast.getAttribute('textContent');
    expect(toastText).toBeTruthy();
    expect(currentUrl).toContain('/verify');
  });
});