const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags 
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock'],
          through: ProductTag,
        },
      ],
    });
    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



  // find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock'],
          through: ProductTag,
        },
      ],
    });

    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.json(tag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


 // create a new tag
 router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});



  // update a tag's name by its `id` value

  router.put('/:id', async (req, res) => {
    try {
      const tag = await Tag.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(tag);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


  // delete on tag by its `id` value

  router.delete('/:id', async (req, res) => {
    try {
      const tag = await Tag.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(tag);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;
