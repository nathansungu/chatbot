import { Router } from "express";

import { rulebasedController } from "./controllers/rulebased";
import { aimodelController } from "./controllers/aimodel";

const router = Router();

router.post("/rulebased", rulebasedController);
router.post("/aimodel", aimodelController);

export default router;
