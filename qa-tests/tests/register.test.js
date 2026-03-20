require('dotenv').config();
const { Builder, By, until, Key } = require('selenium-webdriver');
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
    const url = await driver.getCurrentUrl();
    if (!url.includes('/verify') && !url.includes('/dashboard')) {
      await driver.get('http://localhost:3000/register');
      await driver.sleep(1000);
    }
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
    expect(validationMsg).toMatch(/6 (caracteres|characters)/i);
  });

  it('2. Deve exibir aviso nativo para e-mail incompleto (sem domínio após @)', async () => {
    let emailInput = await driver.findElement(By.css('input[type="email"]'));
    let submitButton = await driver.findElement(By.css('button[type="submit"]'));

    await emailInput.sendKeys(Key.CONTROL, 'a', Key.BACK_SPACE);
    await emailInput.sendKeys('igor@');
    await submitButton.click();

    let validationMsg = await emailInput.getAttribute('validationMessage');
    expect(validationMsg).toMatch(/(Insira uma parte|enter a part)/i);
  });

  it('3. Deve exibir Toast de erro se o e-mail já estiver em uso', async () => {
    let nameInput = await driver.findElement(By.xpath("//input[@placeholder='João da Silva']"));
    let emailInput = await driver.findElement(By.css('input[type="email"]'));
    let passwordInput = await driver.findElement(By.css('input[type="password"]'));
    let submitButton = await driver.findElement(By.css('button[type="submit"]'));

    await nameInput.sendKeys('Usuário Existente');
    await emailInput.sendKeys(Key.CONTROL, 'a', Key.BACK_SPACE);
    await emailInput.sendKeys(process.env.TEST_EMAIL); 
    await passwordInput.sendKeys('123456');
    await submitButton.click();

    let toast = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Este e-mail já está em uso') or contains(text(), 'Erro')]")), 
      5000
    );
    expect(await toast.getAttribute('textContent')).toBeTruthy();
  });

  it('4. Deve criar conta, validar Toast de sucesso e falhar com código errado', async () => {
    let nameInput = await driver.findElement(By.xpath("//input[@placeholder='João da Silva']"));
    let emailInput = await driver.findElement(By.css('input[type="email"]'));
    let passwordInput = await driver.findElement(By.css('input[type="password"]'));
    let submitButton = await driver.findElement(By.css('button[type="submit"]'));

    const emailDinamico = `qa_teste_${Date.now()}@gymtracker.com`;

    await nameInput.sendKeys('Usuário QA Automático');
    await emailInput.sendKeys(Key.CONTROL, 'a', Key.BACK_SPACE);
    await emailInput.sendKeys(emailDinamico);
    await passwordInput.sendKeys('senhaForte123');
    await submitButton.click();

    let successToast = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Conta criada!')]")), 
      8000
    );
    let toastText = await successToast.getText();
    expect(toastText).toContain('Conta criada!');

    await driver.wait(until.urlContains('/verify'), 10000);

    let codeInput = await driver.wait(until.elementLocated(By.css('input')), 5000);
    await codeInput.sendKeys('111111');
    await driver.findElement(By.css('button[type="submit"]')).click();

    let errorToast = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Código inválido')]")), 
      8000
    );
    expect(await errorToast.getAttribute('textContent')).toBeTruthy();
  });

  it('5. Deve validar o acesso com código mestre e APAGAR o usuário no final', async () => {
    let codeInput = await driver.wait(until.elementLocated(By.css('input')), 5000);
    
    await codeInput.sendKeys(Key.CONTROL, 'a', Key.BACK_SPACE); 
    await codeInput.sendKeys('999999');
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlContains('/dashboard'), 15000);
    
    await driver.get('http://localhost:3000/dashboard/profile');
    
    let startJourneyBtn = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(., 'Começar Minha Jornada')]")),
      10000
    );
    await driver.sleep(1000);
    await startJourneyBtn.click();
    await driver.wait(until.stalenessOf(startJourneyBtn), 5000);

    let deleteBtn = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(., 'Excluir Conta')]")),
      10000
    );
    
    await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", deleteBtn);
    await driver.sleep(1000);
    await deleteBtn.click();

    await driver.wait(until.alertIsPresent(), 5000);
    await (await driver.switchTo().alert()).accept();

    await driver.wait(until.urlIs('http://localhost:3000/'), 15000);
    expect(await driver.getCurrentUrl()).toBe('http://localhost:3000/');
  }, 30000);
});