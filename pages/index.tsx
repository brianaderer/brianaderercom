import { gql } from "@apollo/client";
import createApolloClient from "../lib/apolloClient";
import {useEffect, FC, useState} from "react";
import { TypeOut, Badge } from '../components';
import {HomeProps, Category, StringArray, Headline} from '@/interfaces';

export async function getStaticProps() {
    const client = createApolloClient();
    const { data } = await client.query({
        query: gql`
        query MyQuery {
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
            listTechnology {
                id
                name
                category {
                  name
                  id
                }
              }
            listHeadline {
                content
                id
                order
              }
            listCategory {
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
        }
        `,
    });

    return {
        props: {
            contacts: data.listContact.edges,
            categories: data.listCategory,
            technologies: data.listTechnology,
            headlines: data.listHeadline,
        },
    };
}

const Home: FC<HomeProps> = ({ contacts, categories, technologies, headlines }) => {
    const [badgeVisible, setBadgeVisible] = useState(false);

    useEffect(() => {
        console.log(headlines);
    }, [headlines]);

    const headlineStrings: StringArray = {
        strings: headlines.map((headline: Headline) => headline.content)
    };

    function flatListToHierarchical(flatList: Category[]): Category[] {
        const idMap: { [key: string]: Category } = {};
        flatList.forEach(node => {
            idMap[node.id] = { ...node, children: [] };
        });

        const rootNodes: Category[] = [];
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

    function printHierarchicalList(node: Category, indent = 0): JSX.Element {
        return (
            <div key={node.id} style={{ marginLeft: indent * 20 }}>
                {node.name}
                {node.children.map(child => printHierarchicalList(child, indent + 1))}
                <div>
                    {technologies.map((technology, index) => {
                        if (technology.category.id === node.id) {
                            return <div style={{ marginLeft: 20 }} key={index}>{technology.name}</div>
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        );
    }
    const finishedCallback = ()=> {
        console.log('finished');
    }

    const firstLineCallback = () => {
        console.log('first line complete');
    }
    return (
        <div className={`w-1/2`}>
            <TypeOut finishedCallback={finishedCallback} firstLineCallback={firstLineCallback} strings={headlineStrings} />
            <div className={`absolute top-10 right-10`}>
                {contacts?.map((contact, index) => {
                    return <Badge key={index} contact={contact} visible={badgeVisible} />
                })}
            </div>
            <div className={`opacity-0 transition-all`}>
                {flatListToHierarchical(categories).map(node => printHierarchicalList(node))}
            </div>
        </div>
    );
}

export default Home;
