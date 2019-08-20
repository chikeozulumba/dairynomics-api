import fs from 'fs'
import path from 'path'
import { compileToTemplate, buildPDF } from '../utils/PdfService'

/**
 * Handles reciepts generation
 */
export default class RecieptService {
  public templateDir: string = 'templates/reciepts'
  public pathToFile: string = ''
  public source: string = ''
  public pdf: any = null
  public template: string = ''

  /**
   * Pass parameters
   * @param {string} template
   */
  public constructor(template: string) {
    this.pathToFile = path.resolve(__dirname, `../${this.templateDir}/${template}`)
  }

  /**
   * Converts to HTML
   * @name compile
   * @param  {any} data
   * @returns {any|void} Template String
   */
  public compile = async (data: Record<string, any>): Promise<string> => {
    try {
      this.source = await fs.readFileSync(this.pathToFile, 'utf-8')
      this.template = await compileToTemplate(this.source, data)
      return this.template
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * Converts to HTML
   * @name generate
   * @param  {any} data
   * @returns {any|void} Template String
   */
  public generate = async (): Promise<Buffer> => {
    try {
      this.pdf = await buildPDF(this.template)
      return this.pdf
    } catch (error) {
      throw new Error(error)
    }
  }
}
