import { Request, Response } from 'express';

import { Phrase } from '../models/Phrase';

export const ping = (req: Request, res: Response) => {
  res.json({pong: true});
}

export const random = (req: Request, res: Response) => {
  let nRand: number = Math.floor(Math.random() * 10);
  res.json({number: nRand});
}

export const nome = async (req: Request, res: Response) => {
  const nome = req.params.nome;
  res.json({nome: `Você enviou o nome ${nome}`});
}

export const createPhrase = async (req: Request, res: Response) => {
  let { author, txt } = req.body;

  const newPhrase = await Phrase.create({author, txt});

  res.status(201).json({id: newPhrase.id, author, txt});
}

export const listPhrases = async (req: Request, res: Response) => {
  const list = await Phrase.findAll();

  res.status(200).json({ list });
}

export const getPhrase = async (req: Request, res: Response) => {
  const { id } = req.params;

  const phrase = await Phrase.findByPk(id);

  if(phrase) {
    res.status(200).json({ phrase });
  } else {
    res.status(404).json({ error: 'Phrase not found' });
  }

}

export const updatePhrase = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { author, txt } = req.body;

  const phrase = await Phrase.findByPk(id);

  if(phrase) {
    phrase.author = author;
    phrase.txt = txt;

    await phrase.save();
    res.status(201).json({ phrase });
  } else {
    res.status(404).json({ error: 'Phrase not found' });
  }
}

export const deletePhrase = async (req: Request, res: Response) => {
  const { id } = req.params;

  const phrase = await Phrase.findByPk(id);  

  if(phrase) {
    await Phrase.destroy({ where: { id } });
    res.status(200).json({});
  } else {
    res.status(404).json({ error: 'Phrase not found' });
  }
}