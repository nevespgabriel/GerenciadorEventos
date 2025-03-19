import db from "../models/index.js";
const { Event } = db

export const store = async (req, res) => {
  try {
    req.body.creatorId = req.user.id;
    const event = await Event.create(req.body);
    res.status(201).json({ event }); 
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const index = async (req, res) => {
  try {
    const events = await Event.findAll(); 
    res.json(events); 
  } catch (error) {
    res.status(500).send(error.message); 
  }
};

export const show = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).send('Evento não encontrado'); 
    }
  } catch (error) {
    res.status(500).send(error.message); 
  }
};

export const update = async (req, res) => {
  try {
    const [updated] = await Event.update(req.body, {
      where: { id: req.params.id }, 
    });

    if (updated) {
      const updatedEvent = await Event.findByPk(req.params.id);
      res.json(updatedEvent);
    } else {
      res.status(404).send('Evento não encontrado');
    }
  } catch (error) {
    res.status(500).send(error.message); 
  }
};

export const destroy = async (req, res) => {
  try {
    const deleted = await Event.destroy({
      where: { id: req.params.id }, 
    });

    if (deleted) {
      res.status(204).send(); 
    } else {
      res.status(404).send('Evento não encontrado');
    }
  } catch (error) {
    res.status(500).send(error.message); 
  }
};