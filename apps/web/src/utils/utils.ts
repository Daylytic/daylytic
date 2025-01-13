import { faker } from "@faker-js/faker";
import { Task } from "components/panel/content/routine/routine";

let generatedTasks = [] as Task[];

export const generateTasks = (): Task[] => {
    if (generatedTasks.length === 0) {
        generatedTasks = Array.from({ length: 7 }, () => ({
            id: faker.number.int(100000000).toString(),
            title: faker.lorem.words(5),
            description: faker.lorem.sentence({ min: 5, max: 15 }),
            tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
                faker.lorem.word()
            ),
        }));
    }

    return generatedTasks;
};