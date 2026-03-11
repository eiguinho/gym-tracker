require('dotenv').config();
const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Fluxo de Perfil e Logout - GymTracker', () => {
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
  });

  beforeEach(async () => {
    await driver.get('http://localhost:3000/dashboard/profile'); 
    await driver.sleep(1500); 
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('1. Deve exibir aviso ao tentar salvar com nome vazio', async () => {
    let nameInput = await driver.findElement(By.css('input'));
    
    await nameInput.sendKeys(Key.CONTROL, 'a');
    await nameInput.sendKeys(Key.BACK_SPACE);

    let submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    let validationMsg = await nameInput.getAttribute('validationMessage');
    expect(validationMsg).toMatch(/(Preencha|fill out)/i);
  });

  it('2. Deve atualizar o nome e o avatar com sucesso e exibir o Toast', async () => {
    let nameInput = await driver.findElement(By.css('input'));
    await nameInput.sendKeys(Key.CONTROL, 'a');
    await nameInput.sendKeys(Key.BACK_SPACE);
    await nameInput.sendKeys('Igor QA Tester');

    let avatarButtons = await driver.findElements(By.css('button.h-16.w-16'));
    if (avatarButtons.length > 1) {
      await avatarButtons[1].click(); 
      await driver.sleep(500); 
    }

    let submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    let toast = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Perfil atualizado!')]")), 
      5000
    );
    let toastText = await toast.getAttribute('textContent');
    expect(toastText).toBeTruthy();
  });

  it('3. Deve fazer logout e redirecionar para a tela inicial', async () => {
    let headerProfileButton = await driver.wait(
      until.elementLocated(By.css("header .relative button")),
      5000
    );
    
    await driver.sleep(500); 
    await headerProfileButton.click();

    await driver.sleep(500); 

    let logoutButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(., 'Sair')]")),
      5000
    );
    await logoutButton.click();

    await driver.wait(until.urlIs('http://localhost:3000/'), 5000);
    let currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe('http://localhost:3000/');
  });
});