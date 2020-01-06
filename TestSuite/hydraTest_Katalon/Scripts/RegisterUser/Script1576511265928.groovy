import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static com.kms.katalon.core.testobject.ObjectRepository.findWindowsObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.windows.keyword.WindowsBuiltinKeywords as Windows
import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.Keys as Keys

WebUI.openBrowser('')

WebUI.navigateToUrl('http://localhost:5555/')

WebUI.click(findTestObject('Object Repository/Tests/registeringpage/Page_My Fullstack TypeScript App/button_Register'))

WebUI.setText(findTestObject('Object Repository/Tests/registeringpage/Page_My Fullstack TypeScript App/input'), 'TestUser2')

WebUI.setText(findTestObject('Object Repository/Tests/registeringpage/Page_My Fullstack TypeScript App/input_1'), 'UserNAme')

WebUI.setText(findTestObject('Object Repository/Tests/registeringpage/Page_My Fullstack TypeScript App/input_TwoFactor_phonenumber'), 
    '444335323')

WebUI.setText(findTestObject('Object Repository/Tests/registeringpage/Page_My Fullstack TypeScript App/input_TwoFactor_email'), 
    '123455s@gmail.com')

WebUI.setEncryptedText(findTestObject('Object Repository/Tests/registeringpage/Page_My Fullstack TypeScript App/input_TwoFactor_password'), 
    'tzH6RvlfSTg=')

WebUI.click(findTestObject('Object Repository/Tests/registeringpage/Page_My Fullstack TypeScript App/button_Register_1'))

WebUI.closeBrowser()

