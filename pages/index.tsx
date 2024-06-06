import { gql } from "@apollo/client";
import createApolloClient from "../lib/apolloClient";
import { useEffect, FC } from "react";
import { Cursor } from '../components';

interface Contact {
    node: {
        website: string;
        phoneNumber: string;
        name: string;
        id: string;
        email: string;
    };
}

interface Category {
    rght: number;
    treeId: number;
    name: string;
    level: number;
    lft: number;
    id: string;
    parent: Category | null;
    children: Category[];
}

interface Technology {
    id: string;
    name: string;
    category: {
        name: string;
        id: string;
    };
}

interface HomeProps {
    contacts: Contact[];
    categories: Category[];
    technologies: Technology[];
}

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
        },
    };
}

const Home: FC<HomeProps> = ({ contacts, categories, technologies }) => {
    contacts.map(contact => {
        console.log(contact.node);
    });

    useEffect(() => {
        console.log(technologies);
    }, [technologies]);

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

    return (
        <div>
            <Cursor />
            <div>
                {contacts?.map(contact => {
                    const person = contact.node;
                    return (
                        <div key={person.id}>
                            <p>{person.name}</p>
                            <p>{person.phoneNumber}</p>
                            <p>{person.email}</p>
                            <p>{person.website}</p>
                        </div>
                    )
                })}
            </div>
            {flatListToHierarchical(categories).map(node => printHierarchicalList(node))}
        </div>
    );
}

export default Home;
