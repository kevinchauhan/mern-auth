import { Router } from "express";
import { TenantController } from "../controllers/TenantController";
import { TenantService } from "../services/TenantService";
import { Tenants } from "../entity/Tenant";
import { AppDataSource } from "../config/data-source";
import logger from "../config/logger";
import authenticate from "../middlewares/authenticate";
import { canAccess } from "../middlewares/canAccess";
import { Roles } from "../constants";

const router = Router()

const userRepository = AppDataSource.getRepository(Tenants)
const tenantService = new TenantService(userRepository)
const tenantController = new TenantController(tenantService, logger)

router.post('/', authenticate, canAccess([Roles.ADMIN]), (req, res, next) => tenantController.create(req, res, next))

export default router