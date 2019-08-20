import puppeteer from 'puppeteer'
import Handlebars from 'handlebars'
import moment from 'moment'
import fs from 'fs'

/**
 * Converts to HTML
 * @name createTemplateFromHTML
 * @param {string} source
 * @param {array|object} data
 * @param {object|undefined} options
 * @return {string|void} Template String
 */
export const compileToTemplate = (source: any, data: any, options = { strict: true }): any => {
  try {
    Handlebars.registerHelper('uppercase', str => (str && typeof str === 'string' ? str.toUpperCase() : ''))
    Handlebars.registerHelper('toTime', str => moment(str).format('LL'))
    const template = Handlebars.compile(source, options)
    return template(data)
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Converts to HTML
 * @name createPDFFromTemplate
 * @param {string} content
 * @returns {any} Buffer
 */
export const buildPDF = async (content: string): Promise<Buffer> => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()
    await page.setContent(content)
    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        left: '0px',
        top: '0px',
        right: '0px',
        bottom: '0px',
      },
    })
    await browser.close()
    return buffer
  } catch (error) {
    throw new Error(error)
  }
}
