import { DataSource } from 'typeorm';
import { User } from './entity/user';
let AppDataSource = null;
let inited = false;
export async function GetOrCreateDataSource(options) {
    if (inited) {
        return AppDataSource;
    }
    if (!options) {
        throw "create datasource need params options";
    }
    Object.assign(options, { entities: [User] });
    AppDataSource = new DataSource(options);
    await AppDataSource.initialize();
    User.useDataSource(AppDataSource);
    inited = true;
    return AppDataSource;
}
//# sourceMappingURL=db.js.map