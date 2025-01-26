import { faker } from "@faker-js/faker";
import { Task } from "types/task";

let generatedTasks = [] as Task[];

export const generateTasks = (): Task[] => {
    // if (generatedTasks.length === 0) {
    //     generatedTasks = Array.from({ length: 7 }, () => ({
    //         id: faker.number.int(100000000).toString(),
    //         title: faker.lorem.words(5),
    //         description: faker.lorem.sentence({ min: 5, max: 15 }),
    //         isCompleted: false,
    //         tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
    //             faker.lorem.word()
    //         ),
    //     }));
    // }

    return generatedTasks;
};

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

export function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}