import { Router } from "express";
import { PrismaWordHierarckyRepository } from "../../WordHierarcky/infra/repositories/PrismaWordHierarckyRepository";
import { CreateWordHierarckyService } from "../../WordHierarcky/domain/services/CreateWordHierarckyService";
import { FindAllWordHierarckyService } from "../../WordHierarcky/domain/services/FindAllWordHierarckyService";
import { WordHierarckyController } from "../controllers/wordHierarckyController";

const router = Router();

const prismaWordHierarckyRepository = new PrismaWordHierarckyRepository();

const createWordHierarckyService = new CreateWordHierarckyService(
  prismaWordHierarckyRepository
);

const findAllWordHierarckyService = new FindAllWordHierarckyService(
  prismaWordHierarckyRepository
);

const wordHierarckyController = new WordHierarckyController(
  createWordHierarckyService,
  findAllWordHierarckyService
)


/**
 * @swagger
 * /wordHierarchy:
 *  post:
 *    tags:
 *      - WordHierarchy
 *    summary: Create a new Word Hierarchy
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - word
 *            properties:
 *              word:
 *                type: string
 *                description: The word to add to the hierarchy
 *                example: "Electricity"
 *              parentId:
 *                type: integer
 *                description: The ID of the parent word (optional)
 *                example: 1
 *    responses:
 *      201:
 *        description: Word created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Word created successfully
 *                success:
 *                  type: boolean
 *                  example: true
 *      400:
 *        description: Invalid input
 *      500:
 *        description: Internal server error
 */
router.post('/', async (req, res, next) => {
  try {
    await wordHierarckyController.create(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * tags:
 *    - name: WordHierarchy
 *      description: Endpoints related to word hierarchy management
 * /wordHierarchy:
 *  get:
 *    tags:
 *      - WordHierarchy
 *    summary: Return all Words in the Hierarchy
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  word:
 *                    type: string
 *                    example: "Electricity"
 *                  parentId:
 *                    type: integer
 *                    example: 2
 *                  children:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                          example: 2
 *                        word:
 *                          type: string
 *                          example: "Energy"
 *                  createdAt:
 *                    type: string
 *                    format: date-time
 *                    example: "2023-10-01T00:00:00.000Z"
 *                  updatedAt:
 *                    type: string
 *                    format: date-time
 *                    example: "2023-10-15T12:00:00.000Z"
 *      500:
 *        description: Internal server error
 */
router.get('/', async (req, res, next) => {
  try {
    await wordHierarckyController.findAll(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;