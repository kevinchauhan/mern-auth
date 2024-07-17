import { Repository } from "typeorm";
import { Tenants } from "../entity/Tenant";
import { ITenantData } from "../types";
import createHttpError from "http-errors";

export class TenantService {

    constructor(private tenantRepository: Repository<Tenants>) { }

    async create({ name, address }: ITenantData) {
        try {
            const tenant = await this.tenantRepository.save({ name, address })
            return tenant
        } catch (error) {
            const err = createHttpError(500, 'Failed to store data in db')
            throw err
        }
    }

    async getAll() {
        try {
            const tenant = await this.tenantRepository.find()
            return tenant
        } catch (error) {
            const err = createHttpError(500, 'Failed to fetch data from db')
            throw err
        }
    }

    async findById(id: number) {
        try {
            const tenant = await this.tenantRepository.findOne({ where: { id } })
            return tenant
        } catch (error) {
            const err = createHttpError(500, 'Failed to fetch data from db')
            throw err
        }
    }

    async update(id: number, data: ITenantData) {
        try {
            const tenant = await this.tenantRepository.update(id, data)
            return tenant
        } catch (error) {
            const err = createHttpError(500, 'Failed to update data in db')
            throw err
        }
    }

    async remove(id: number) {
        try {
            const tenant = await this.tenantRepository.delete(id)
            return tenant
        } catch (error) {
            const err = createHttpError(500, 'Failed to update data in db')
            throw err
        }
    }
}