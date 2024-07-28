
import {Container, GroupedContainers} from "../types";

function  createGroupDict(items: Container[]): GroupedContainers[] {
    const dict: Record<string, Container[]> = {};

    items.forEach(item => {
        if (!dict[item.container_group]) {
            dict[item.container_group] = [];
        }
        dict[item.container_group].push(item);
    });

    return Object.keys(dict).map(key => {
        const groupedItems: GroupedContainers = {key: key, items: dict[key]};

        return groupedItems;
    })
}

export default createGroupDict;
