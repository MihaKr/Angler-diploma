import {number} from "prop-types";
import React from "react";

export interface GroupedContainers {
    key: string;
    items: Container[];
}

export interface DropDownProps {
    allContainers: Container[];
    setAllContainers?: React.Dispatch<React.SetStateAction<Container[]>>;
    handleClickAllContainers?: any;
    group_name: string;
}

export interface Container{
    container_id: string
    container_name: string
    container_group: string
    container_type: string
}

export interface ArgObj {
    [key: number]: { args: string };
}

export interface AddNewContainerModalProps {
    showModal: boolean;
    setShowModal? : React.Dispatch<React.SetStateAction<boolean>>;
    allContainers: []
    setAllContainers: React.Dispatch<React.SetStateAction<any[]>>;
    successMessage: any;
    setSuccessMessage: React.Dispatch<React.SetStateAction<String>>;

}

export type MyData = {
    container_name: string;
    container_group: string;
    container_path: string;
    container_type: string;
};

export type MyDataCont = {
    app_id: number;
    app_name: string;
    owner: string;
    used_containers: string;
    short_desc: string;
    date_last_modified: any
};

export interface AllContainerProps {
    all_containers: any
    drag_func: any
}

export interface AllContainers {
    container_id: string;
    container_name: string
    container_type: string
}

export interface AppSelectionButtonProps {
    text: string
    app_id: Number
    date_last_modified: Date
    description: string
}

export interface AllContainersI {
    container_type: string;
    app_container_id: number;
    container_name: string;
    container_id: number;
    app_id: number;
    position: { x: number, y: number };
    type: string
    text: string
}

export interface CreateAppFormModalProps {
    showModal: boolean;
    setShowModal? : React.Dispatch<React.SetStateAction<boolean>>;
    apps: []
    setApps: React.Dispatch<React.SetStateAction<any[]>>;
    groups: any[];
}

export interface flowProps {
    nodes: any;
    setNodes: React.Dispatch<React.SetStateAction<any>>;
    edges: any;
    setEdges: React.Dispatch<React.SetStateAction<any>>;
    app_id: number
    setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
    app_cont_id: string;
    setApp_cont_id: React.Dispatch<React.SetStateAction<string>>;
    conf_file: String;
    setConfFile: React.Dispatch<React.SetStateAction<string>>;
}

export interface edgeP {
    app_id_link: number
    origin: number
    origin_edge: string
    destination: number
    destination_edge: string
}

export interface MenuButtonProps {
    text: string
    setShowModal? : React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ContainerButtonProps {
    app_id: number
    successMessage: any;
    setSuccessMessage: React.Dispatch<React.SetStateAction<String>>;
    allContainers: []
    setAllContainers: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface TsContentProps {
    setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
    showModal: boolean;
    contArgs: object
    setcontArgs:React.Dispatch<React.SetStateAction<ArgObj>>;
    app_cont_id: string;
    setApp_cont_id:  React.Dispatch<React.SetStateAction<string>>;
    conf_file: string;
    setConfFile:  React.Dispatch<React.SetStateAction<string>>;

}
export interface DynamicComponentProps {
    contArgs: object
    setcontArgs: React.Dispatch<React.SetStateAction<ArgObj>>
    app_cont_id: string
    setShowModal? : React.Dispatch<React.SetStateAction<boolean>>;
}

export interface logProps {
    check: any;
}

export interface CenterMenuProps {
    apps: []
    setApps: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface edge {
    link_id: number,
    app_id_link: number
    origin: number
    origin_edge: string
    destination: number
    destination_edge: string
}

export interface DisplayPipelineProps {
    data: any;
    updateData: React.Dispatch<React.SetStateAction<any>>;
    edge_data: any
    update_edge: React.Dispatch<React.SetStateAction<any>>;
    app_id: number
    setShowModal : React.Dispatch<React.SetStateAction<boolean>>;
    app_cont_id: string;
    setApp_cont_id:  React.Dispatch<React.SetStateAction<string>>;
    conf_file: String;
    setConfFile:  React.Dispatch<React.SetStateAction<string>>;
    allCont: []
}