// import { getRepository } from 'typeorm';
// import { Test } from '../entities/test';
// import { Response, Request, NextFunction } from 'express';

// export default {
//   async getTests(req: Request, res: Response, next: NextFunction) {
//     try {
//       const tests = await getRepository(Test).find();
//       res.status(200).send(tests);
//     } catch (e) {
//       next(e);
//     }
//   },
//   async getTest(req: Request, res: Response, next: NextFunction) {
//     try {
//       const test = await getRepository(Test).findOneOrFail(req.params.id);
//       res.status(200).send(test);
//     } catch (e) {
//       next(e);
//     }
//   },
//   async postTest(req: Request, res: Response, next: NextFunction) {
//     try {
//       const test = await getRepository(Test).create(req.body);
//       const response = await getRepository(Test).save(test);
//       res.status(200).send(response);
//     } catch (e) {
//       next(e);
//     }
//   },
//   async removeTest(req: Request, res: Response, next: NextFunction) {
//     try {
//       await getRepository(Test).delete(req.params.id);
//       res.sendStatus(204);
//     } catch (e) {
//       next(e);
//     }
//   },
//   async updateTest(req: Request, res: Response, next: NextFunction) {
//     try {
//       const test = await getRepository(Test).update(req.params.id, req.body);
//       res.status(200).send(test);
//     } catch (e) {
//       next(e);
//     }
//   }
// };
