import { systemRoles } from "../../utils/systemRoles";

export const categoryApiRoles ={
    CREATE_CATEGORY:[systemRoles.ADMIN,systemRoles.SUPER_ADMIN],
    UPDATE_CATEGORY:[systemRoles.ADMIN,systemRoles.SUPER_ADMIN],
}