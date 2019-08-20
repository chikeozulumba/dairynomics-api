import CRUDController from '../../utils/crud'

/**
 * Product Category controller class
 */
class ProductCategoryController extends CRUDController {
  /**
   * @protected
   * @memberof ProductCategoryController
   */
  protected model = 'ProductCategory'
}

export default new ProductCategoryController()
