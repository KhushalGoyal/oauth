"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessGuard = void 0;
function AccessGuard(serviceType) {
    return async (request, response, next) => {
        try {
            // const user = TokensHelper.decodeToken(request.headers.authorization) as PortaJWTPayLoad;
            // if (!user) throw new AppException(StatusCodes.UNAUTHORIZED_ACCESS, "Un-Authorized Access");
            // const role = (await RolesModel.findById(user.role)).toObject() as RolesEntity;
            // const permission = role.permissions.find((el) => el.portalId.toString() === user.portalId.toString());
            // const rights = permission.services.find((el) => el.code === serviceType);
            // const { access } = rights;
            // if (!access) throw new AppException(StatusCodes.UNAUTHORIZED_ACCESS, "Access Denied");
            // if ((request.method === Methods.GET) && !access.canRead) throw new AppException(StatusCodes.UNAUTHORIZED_ACCESS, "Access Denied");
            // eslint-disable-next-line max-len
            // if ((request.method === Methods.POST || request.method === Methods.PUT) && (!access.canRead || !access.canWrite)) throw new AppException(StatusCodes.UNAUTHORIZED_ACCESS, "Access Denied");
            // if ((request.method === Methods.DELETE) && (!access.canRead || !access.canWrite || !access.canDelete)) throw new AppException(StatusCodes.UNAUTHORIZED_ACCESS, "Access Denied");
            next();
        }
        catch (err) {
            next(err);
        }
    };
}
exports.AccessGuard = AccessGuard;
//# sourceMappingURL=guard.js.map