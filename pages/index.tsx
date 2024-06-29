import { gql } from "@apollo/client";
import createApolloClient from "../lib/apolloClient";
import {useEffect, FC, useState, useRef} from "react";
import { TypeOut, Badge, MenuLink, Job, Project } from '@/components';
import {HomeProps, Technology, StringArray, Headline} from '@/interfaces';

export async function getStaticProps() {
    const client = createApolloClient();
    const { data } = await client.query({
        query: gql`
        query MyQuery {
          listProjects {
            description
            featured
            id
            name
            url
            technologies {
              description
              id
              level
              lft
              name
              rght
              treeId
              parent {
                id
              }
              children {
                id
              }
            }
          }
          listContact (primary: true) {
            edges {
              node {
                website
                phoneNumber
                name
                id
                email
              }
            }
          }
            listHeadline {
                content
                id
                order
              }
            listTechnology {
                rght
                treeId
                name
                level
                lft
                id
                parent {
                    id
                    name
                }
                children {
                    id
                    name
                }
            }
              listMenu {
                id
                introduction
                name
                order
                resource
              }
               listJobs {
                    description
                    endDate
                    deliverables {
                      description
                      id
                      name
                      technologies {
                        description
                        id
                        level
                        lft
                        name
                        rght
                        treeId
                        parent {
                          id
                        }
                        children {
                          id
                        }
                      }
                    }
                    name
                    startDate
                    title
          }
        }
        `,
    });

    return {
        props: {
            contacts: data.listContact.edges,
            technologies: data.listTechnology,
            headlines: data.listHeadline,
            menu: data.listMenu,
            jobs: data.listJobs,
            projects: data.listProjects,
        },
    };
}

const Home: FC<HomeProps> = ({ contacts, technologies, headlines, menu, jobs, projects }) => {
    const [badgeVisible, setBadgeVisible] = useState(false);
    const [siteVisible, setSiteVisible] = useState(false);
    const [selectedSection, setSelectedSection] = useState('');
    const  typeOutStrings = useRef<string[]>([]);
    const startProcess = useRef(true);
    const [headlinePrinted, setHeadlinePrinted] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    useEffect(() => {
        if( !headlinePrinted ){
            typeOutStrings.current = headlines.map((headline: Headline) => headline.content)
            setHeadlinePrinted(true);
        } else {
            const selectedMenuItem = menu.find(item => item.resource === selectedSection)
            const introduction = (selectedMenuItem?.introduction);
            if(introduction){
                typeOutStrings.current=[];
                setSiteVisible(false);
                typeOutStrings.current=[introduction];
                startProcess.current = true;
            }
        }
        
    }, [headlines, selectedSection, menu, headlinePrinted]);
    console.log(projects);
    function flatListToHierarchical(flatList: Technology[]): Technology[] {
        const idMap: { [key: string]: Technology } = {};
        flatList.forEach(node => {
            idMap[node.id] = {...node, children: []};
        });

        const rootNodes: Technology[] = [];
        flatList.forEach(node => {
            if (node.parent === null) {
                rootNodes.push(idMap[node.id]);
            } else {
                const parentNode = idMap[node.parent.id];
                if (parentNode) {
                    parentNode.children.push(idMap[node.id]);
                }
            }
        });

        return rootNodes;
    }

    function printHierarchicalList(node: Technology, indent = 0): JSX.Element {
        return (
            <div key={node.id} style={{marginLeft: indent * 20}}>
                {node.name}
                {node.children.map(child => printHierarchicalList(child, indent + 1))}
            </div>
        );
    }

    const finishedCallback = () => {
        setSiteVisible(true);
        if( !menuVisible ){
            setMenuVisible(true);
        }
    }

    const firstLineCallback = () => {
        setBadgeVisible(true);
    }
    const loadAsset = (props: { target: string }) => {
        const {target} = props;
        setSelectedSection(target);
    };
    return (
        <div className={`p-8 pt-20 w-1/2 overflow-hidden min-h-[100vh]`}>
            <TypeOut setSiteVisible={setSiteVisible} startProcess={startProcess} finishedCallback={finishedCallback}
                     firstLineCallback={firstLineCallback} strings={typeOutStrings.current}/>
            <div className={`fixed top-2 right-2 flex flex-col`}>
                {contacts?.map((contact, index) => {
                    return <Badge key={index} contact={contact} visible={badgeVisible}/>
                })}
                <div
                    className={`w-full flex flex-col gap-6 justify-center items-end p-8 text-lg ${menuVisible ? `opacity-1 h-auto` : `opacity-0 h-0`} border-b border-l border-green-600 mt-4`}>
                    {
                        menu.map((item, index) => {
                            return (
                                <MenuLink onClick={() => loadAsset({target: item.resource})}
                                          key={index}>{item.name}</MenuLink>
                            )
                        })
                    }
                </div>
            </div>
            <div
                className={`${siteVisible && selectedSection === 'skillsAndTech' ? `opacity-1` : `opacity-0 h-0`} mt-10 transition-all`}>
                {flatListToHierarchical(technologies).map(node => printHierarchicalList(node))}
            </div>
            <div
                className={`${siteVisible && selectedSection === 'cv' ? `opacity-1` : `opacity-0 h-0`} mt-10 transition-all`}>
                {jobs.map((job, index) => {
                    return <Job key={index} job={job} />
                })}
            </div>
            <div
                className={`${siteVisible && selectedSection === 'projects' ? `opacity-1` : `opacity-0 h-0`} mt-10 transition-all flex flex-col gap-4`}>
                {projects.map((project, index) => {
                    return <Project key={index} project={project} />
                })}
            </div>
        </div>
    );
}

export default Home;
