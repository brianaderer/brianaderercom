import { gql } from "@apollo/client";
import createApolloClient from "../lib/apolloClient";

export async function getStaticProps() {
    const client = createApolloClient();
    const { data } = await client.query({
        query: gql`
    query MyQuery {
      listContact {
        id
        name
        phoneNumber
      }
    }
    `,
    });

    return {
        props: {
            contacts: data.listContact.slice(0, 4),
        },
    };
}

export default function Home({ contacts }) {
    return(
        <div >
            {contacts.map((contact) => (
                <div key={contact.id}>
                    <h3>{contact.name}</h3>
                    <p>
                        {contact.phoneNumber}
                    </p>
                </div>
            ))}
        </div>
    )
}
