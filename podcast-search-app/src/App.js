// Step #1, import statements
import React from "react";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import {
  PagingInfo,
  ResultsPerPage,
  Paging,
  Facet,
  SearchProvider,
  Results,
  SearchBox,
  Sorting
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
// Step #2, The connector
const connector = new AppSearchAPIConnector({
  searchKey: "search-pvohhb8ycix514um11xh2deu",
  engineName: "podcast-search",
  endpointBase: "http://localhost:3002"
});
// Step #3: Configuration options
const configurationOptions = {
  apiConnector: connector,
  searchQuery: {
    search_fields: {
      // 1. Search by name of video game.
      title: {}
    },
    // 2. Results: name, genre, publisher, scores, and platform.
    result_fields: {
      title: {
        // A snippet means that matching search terms will be wrapped in <em> tags.
        snippet: {
          size: 75, // Limit the snippet to 75 characters.
          fallback: true // Fallback to a "raw" result.
        }
      },
      description: {
        snippet: {
          size: 200,
          fallback: true
        }
      },
    },
    // 3. Facet by scores, genre, publisher, and platform, which we'll use to build filters later.
    facets: {
      visitors: {
        type: "range",
        ranges: [
          { from: 0, to: 10000, name: "Not busy" },
          { from: 10000, to: 10000000000, name: "Busy" },
        ]
      },
    }
  }
};
// Step #4, SearchProvider: The finishing touches
export default function App() {
  return (
    <SearchProvider config={configurationOptions}>
      <div className="App">
      <Layout
        header={<SearchBox />}
        bodyContent={<Results titleField="name"/>}
        sideContent={
          <div>
            <Facet field="visitors" label="Visitors" />
          </div>
        }
        bodyHeader={
          <>
            <PagingInfo />
            <ResultsPerPage />
          </>
        }
        bodyFooter={<Paging />}
      />
      </div>
    </SearchProvider>
  );
}

//export default App;
