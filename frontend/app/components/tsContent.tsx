// pages/index.tsx
import React, { useState, useEffect, Suspense, lazy } from 'react';
import DataFetcher from "@/app/components/datafetcher";
import DataFetch from "@/app/components/dataFetch";

interface Container {
    container_id: string
    container_name: string
    container_group: any
}

interface ArgObj {
    [key: number]: { args: string };
}

interface TsContentProps {
    setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
    showModal: boolean;
    contArgs: object
    setcontArgs:React.Dispatch<React.SetStateAction<ArgObj>>;
    app_cont_id: string;
    setApp_cont_id:  React.Dispatch<React.SetStateAction<string>>;
    conf_file: string;
    setConfFile:  React.Dispatch<React.SetStateAction<string>>;

}

interface DynamicComponentProps {
    contArgs: object
    setcontArgs: React.Dispatch<React.SetStateAction<ArgObj>>
    app_cont_id: string
    setShowModal? : React.Dispatch<React.SetStateAction<boolean>>;

}

export const TsContent: React.FC<TsContentProps> = ({ setShowModal, showModal, contArgs, setcontArgs,setConfFile, conf_file, setApp_cont_id, app_cont_id }) => {
    const [PageComponent, setPageComponent] = useState<React.ComponentType<DynamicComponentProps> | null>(null);
    const [contName, setContName] = useState<any> (null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://0.0.0.0:8000/angler_core/all_cont?cont_id=${conf_file}`);
                const data = await response.json();
                setContName(data); // Assuming data is the correct format
                console.log(data[0].container_name)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [conf_file]);

    useEffect(() => {
        //DataFetch(setContName, `http://0.0.0.0:8000/angler_core/all_cont?cont_id=${conf_file}`)
        const handleFetchPageContent = async () => {

            if (conf_file) {
                try {
                    const DynamicComponent = lazy(() => import(`../configs/${contName[0].container_name}`));
                    setPageComponent(() => DynamicComponent);
                } catch (error) {
                    console.error('Page not found', error);
                    setPageComponent(() => () => <p>Page not found</p>);
                }
            }
        };

        handleFetchPageContent();
    }, [contName]);

    const handleClickBackground: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if ((event.target as HTMLDivElement).id === 'background-modal') {
            if (setShowModal) {
                setShowModal(false);
            }
        }
    };

    return (
        <div>
            {showModal && (
                <div
                    id="background-modal"
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
                    onClick={handleClickBackground}
                >
                    <div
                        id="form-modal"
                        className="bg-white p-6 rounded-lg shadow-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div>
                            {PageComponent && (
                                <Suspense fallback={<div>Loading...</div>}>
                                    <PageComponent contArgs={contArgs} setcontArgs={setcontArgs}
                                                   app_cont_id={app_cont_id} setShowModal={setShowModal}
                                    />
                                </Suspense>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

TsContent.displayName = "TsContent";

export default TsContent;


/*
* 
*         <div>
            <dialog open={showModal} className="modal z-50">
                <div id={"background-modal"}
                     className={"fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75"}
                     onClick={handleClickBackground}>
                    <div>
                        {PageComponent && (
                            <Suspense fallback={<div>Loading...</div>}>
                                <PageComponent/>
                            </Suspense>
                        )}
                    </div>
                </div>
            </dialog>
        </div>*/

/*
*
*                     {PageComponent && (
                        <Suspense fallback={<div>Loading...</div>}>
                            <PageComponent/>
                        </Suspense>
                    )}
* */


// pages/index.tsx
/*import React, { useState, Suspense, lazy } from 'react';

interface tsContentProps {
    setShowModal? : React.Dispatch<React.SetStateAction<boolean>>;
    showModal: boolean;
}

export const tsContent: React.FC<tsContentProps> = ({ setShowModal, showModal}) => {
    const [pageName, setPageName] = useState('');
    const [PageComponent, setPageComponent] = useState<React.ComponentType | null>(null);


    const handleFetchPageContent = async () => {
        if (pageName) {
            try {
                const DynamicComponent = lazy(() => import(`../configs/${pageName}`));
                setPageComponent(() => DynamicComponent);
            } catch (error) {
                console.error('Page not found', error);
                setPageComponent(() => () => <p>Page not found</p>);
            }
        }
    };

    const handleClickBackground: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if((event.target as HTMLDivElement).id == 'background-modal') {
            if (setShowModal) {
                setShowModal(false)
            }
        }
    };

    return (
        <div>
            <h1>Welcome to the Index Page</h1>
            <input
                type="text"
                value={pageName}
                onChange={(e) => setPageName(e.target.value)}
                placeholder="Enter page name"
            />
            <button onClick={handleFetchPageContent}>Load Page Content</button>
            <dialog open={showModal} className="modal z-50">
                <div id={"background-modal"}
                     className={"fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75"}
                     onClick={handleClickBackground}>
                    <div>
                        {PageComponent && (
                            <Suspense fallback={<div>Loading...</div>}>
                                <PageComponent/>
                            </Suspense>
                        )}
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default tsContent;

*/
/*
*
*                     {PageComponent && (
                        <Suspense fallback={<div>Loading...</div>}>
                            <PageComponent/>
                        </Suspense>
                    )}
* */