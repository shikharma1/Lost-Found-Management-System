const router = require('express').Router();
const {
  createItem,
  getAllItems,
  getItemById,
  searchItems,
  updateItem,
  deleteItem,
  getMyItems,
} = require('../controllers/itemController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', getAllItems);
router.get('/search/query', searchItems);
router.get('/:id', getItemById);

// Protected routes
router.post('/', auth, createItem);
router.get('/user/my-items', auth, getMyItems);
router.put('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);

module.exports = router;
