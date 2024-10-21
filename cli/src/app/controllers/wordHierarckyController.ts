import { Request, Response } from "express";
import { CreateWordHierarckyService } from "../../WordHierarcky/domain/services/CreateWordHierarckyService";
import { FindAllWordHierarckyService } from "../../WordHierarcky/domain/services/FindAllWordHierarckyService";

export class WordHierarckyController {
  constructor(
    private readonly createWordHierarckyService: CreateWordHierarckyService,
    private readonly findAllWordHierarckyService: FindAllWordHierarckyService
  ) {}

  async create(req: Request, res: Response) {
    const { word, parentId } = req.body;
    try {
      if (!word) return res.status(401).send({ message: 'Word is required', success: false })
      await this.createWordHierarckyService.execute(word, parentId);
      return res.status(201).send({ message: 'Invoice extracted successfully', success: true });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).send({ message: error.message, success: false });
      }
      return res.status(500).send({ message: 'Unknown error', success: false });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await this.findAllWordHierarckyService.execute();
      return res.status(200).send({
        message: 'Find All Words',
        data: result,
        success: true
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).send({
          message: error.message,
          success: false
        });
      }
      return res.status(401).send({
        message: 'Unknown error',
        success: false
      });
    }
  }
}