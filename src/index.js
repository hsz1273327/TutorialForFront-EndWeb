import { GetOrCreateDataSource } from './models/db.js';
import { User } from './models/entity/user.js';
GetOrCreateDataSource({
    type: "sqlite",
    database: "./test.db",
    // entities:["models/**/entity/*.js"],
    synchronize: true
}).then((datasource) => {
    console.log(`init AppDataSource ok}`);
    let u1 = new User();
    u1.firstName = "Li";
    u1.lastName = "Wei";
    return u1.save();
}).then((res) => {
    console.log(`saved user ${res.id}`);
    return User.findByName("Li", "Wei");
}).then((users) => {
    for (let user of users) {
        console.log(`find user ${user.id} with name ${user.firstName} ${user.lastName}`);
    }
});
//# sourceMappingURL=index.js.map