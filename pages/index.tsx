import { gql } from "@apollo/client";
import createApolloClient from "../lib/apolloClient";
import React, {useEffect, FC, useState, useRef, useCallback} from "react";
import { TypeOut, Badge, MenuLink, Job, Project, RotatingPlusMinus } from '@/components';
import {HomeProps, Technology, StringArray, Headline} from '@/interfaces';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config';
import Head from 'next/head';

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
        revalidate: 60,
    };
}

type DisplayComponentsType = {
    [key: string]: React.ReactElement[];
};

const Home: FC<HomeProps> = ({ contacts, technologies, headlines, menu, jobs, projects }) => {
    const [badgeVisible, setBadgeVisible] = useState(false);
    const [siteVisible, setSiteVisible] = useState(false);
    const [selectedSection, setSelectedSection] = useState('');
    const  typeOutStrings = useRef<string[]>([]);
    const [startProcess, setStartProcess] = useState(true);
    const [headlinePrinted, setHeadlinePrinted] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [breakpoint, setBreakpoint] = useState<string | false>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [globalParsedScreens, setGlobalParsedScreens] = useState<{[key: string]: number}>({});
    const [isOpen, setIsOpen] = useState(false);
    const displayComponents = useRef<DisplayComponentsType>({});

    useEffect(() => {
        console.log('headline printed ', headlinePrinted)
        if( !headlinePrinted ){
            typeOutStrings.current = headlines.map((headline: Headline) => headline.content)
            setSiteVisible(false);
        } else {
            const selectedMenuItem = menu.find(item => item.resource === selectedSection)
            const introduction = (selectedMenuItem?.introduction);
            if(introduction?.length){
                setSiteVisible(false);
                typeOutStrings.current=[introduction];
                setStartProcess(true);
            }
        }

    }, [headlines, selectedSection, menu, headlinePrinted]);

    useEffect(() => {
        const fullConfig = resolveConfig(tailwindConfig);
        const screens = fullConfig.theme.screens;
        let parsedScreens = {};
        for (const [key, value] of Object.entries(screens)) {
            // @ts-ignore
            parsedScreens[key] = parseInt(value.replace('px', ''), 10);
        }
        setGlobalParsedScreens(parsedScreens);
        const handleResize = () => {
            let largestBreakpoint: string | false = false;
            const width = window.innerWidth;
            for (const [key, value] of Object.entries(parsedScreens) as [string, number][]) {
                if (width >= value) {
                    largestBreakpoint = key;
                } else {
                    break;
                }
            }
            setBreakpoint(largestBreakpoint);
        };
        handleResize(); // Set the initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const compareBreakpoints = useCallback((checkBreakpoint: string | false) => {
        if (breakpoint) {
            for (const screen in globalParsedScreens) {
                if (screen === checkBreakpoint) {
                    return false;
                }
                if (screen === breakpoint) {
                    return true;
                }
            }
        } else {
            return true;
        }
    }, [breakpoint, globalParsedScreens]);



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

    const fontSizeLookup = [
        'text-sm',
        'text-md',
        'text-lg',
        'text-xl',
    ];

    const printHierarchicalList = useCallback(
        function (node: Technology, indent = 0): JSX.Element {
            return (
                <div className={`${indent === 0 ? 'mt-4' : ''}  ${ 3 - indent > - 1 ? fontSizeLookup[3-indent] : fontSizeLookup[0] }`} key={node.id} style={{ marginLeft: indent * 20 }}>
                    {node.name}
                    {node.children.map((child) => printHierarchicalList(child, indent + 1))}
                </div>
            );
        },
        [] // Add dependencies here if necessary
    );

    const finishedCallback = () => {
        if( headlinePrinted ){
            setSiteVisible(true);
        }
        if( !menuVisible ){
            setMenuVisible(true);
        }
    }

    const firstLineCallback = () => {
        setBadgeVisible(true);
    }
    const loadAsset = (props: { target: string }) => {
        const {target} = props;
        scrollToTop();
        setIsOpen(false);
        setMobileMenuOpen(false);
        setSelectedSection(target);
    };

    const handleMenuToggle = (isOpen: boolean) => {
        setMobileMenuOpen(!isOpen);
        setIsOpen(!isOpen);
    };

    useEffect(() => {
            displayComponents.current['projects'] = projects.reverse().map((project, index) => {
                return <Project key={index} project={project}/>
            });
        },
        [projects]);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }


    useEffect(() => {
            displayComponents.current['cv'] = jobs.map((job, index) => {
                return <Job key={index} job={job}/>
            });
        },
        [jobs]);

    useEffect(() => {
            displayComponents.current['skillsAndTech'] = flatListToHierarchical(technologies).map(node => printHierarchicalList(node));
        },
        [printHierarchicalList, technologies]);

    return (
            <main className={'p-8 pr-20 lg:pr:0 pt-20 w:5/6 lg:w-1/2 overflow-hidden min-h-[100vh] relative'}>
                <Head>
                    <title>Brian Aderer - React, Python, and PHP Developer</title>
                    <meta name="description" content="Brian Aderer is an experienced, full-stack, Senior React, Python, and PHP developer with a proven track-record of enterprise level deliverables."/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta charSet="UTF-8"/>
                    <meta property="og:title" content="Brian Aderer - React, Python, and PHP Developer"/>
                    <meta property="og:description" content="Brian Aderer is an experienced, full-stack, Senior React, Python, and PHP developer with a proven track-record of enterprise level deliverables."/>
                    {/*<meta property="og:image" content="/path-to-your-image.jpg"/>*/}
                    <meta property="og:url" content="https://brianaderer.com"/>
                    {/*<meta name="twitter:card" content="summary_large_image"/>*/}
                </Head>
                <div className={`w-full`}>
                    <div
                        style={{
                            backgroundColor: 'rgba(var(--background-start-rgb), 0.9)',
                        }}
                        className={`min-h-[100vh] min-w-[100vw] h-full w-full duration-300 z-10 absolute ${mobileMenuOpen ? 'right-0' : 'right-full'}`}></div>
                    <TypeOut setStartProcess={setStartProcess} setHeadlinePrinted={setHeadlinePrinted}
                             setSiteVisible={setSiteVisible} startProcess={startProcess} finishedCallback={finishedCallback}
                         firstLineCallback={firstLineCallback} strings={typeOutStrings.current}/>
                <div className={`z-20 fixed top-2 right-2 flex flex-col ${!mobileMenuOpen && compareBreakpoints('lg') ? 'translate-x-[103%]' : ''} transition-all duration-500`}>
                    {menuVisible && compareBreakpoints('lg') &&
                        <div
                        style = {{
                            backgroundColor: 'rgba(var(--foreground-rgb), 0.2)',
                        }}
                        className="z-20 border-green-600 border-b-2 absolute w-12 h-full l-0 translate-x-[-100%]">
                        <div className="opacity-100 absolute top-2 l-0 r-0">
                            <RotatingPlusMinus isOpen={isOpen} handleMenuToggle={handleMenuToggle}/>
                        </div>
                    </div>}
                    {contacts?.map((contact, index) => {
                        return <Badge key={index} contact={contact} visible={badgeVisible}/>
                    })}
                    <div
                        className={`bg-[rgb(var(--background-start-rgb))] w-full flex flex-col gap-6 justify-center items-end p-8 text-lg ${menuVisible ? `opacity-1 h-auto` : `opacity-0 h-0`} border-b border-l border-green-600 lg:mt-4`}>
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
                    className={`${siteVisible ? `opacity-1` : `opacity-0`} mt-10 transition-all`}>
                    {displayComponents.current[selectedSection]}
                </div>
            </div>
        </main>
    );
}

export default Home;
