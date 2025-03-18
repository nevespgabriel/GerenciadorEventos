import Registration from "../models/Registration.js";

export const store = async (req, res) => {
  try {
    const registration = await Registration.create(req.body);; 
    res.status(201).json({ registration }); 
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const index = async (req, res) => {
  try {
    const registrations = await Registration.findAll(); 
    res.json(registrations); 
  } catch (error) {
    res.status(500).send(error.message); 
  }
};

export const show = async (req, res) => {
  try {
    const registration = await Registration.findByPk(req.params.id);
    if (registration) {
      res.json(registration);
    } else {
      res.status(404).send('Registro não encontrado'); 
    }
  } catch (error) {
    res.status(500).send(error.message); 
  }
};

export const update = async (req, res) => {
  try {
    const [updated] = await Registration.update(req.body, {
      where: { id: req.params.id }, 
    });

    if (updated) {
      const updatedRegistration = await Registration.findByPk(req.params.id);
      res.json(updatedRegistration);
    } else {
      res.status(404).send('Registro não encontrado');
    }
  } catch (error) {
    res.status(500).send(error.message); 
  }
};

export const destroy = async (req, res) => {
  try {
    const deleted = await Registration.destroy({
      where: { id: req.params.id }, 
    });

    if (deleted) {
      res.status(204).send(); 
    } else {
      res.status(404).send('Registro não encontrado');
    }
  } catch (error) {
    res.status(500).send(error.message); 
  }
};