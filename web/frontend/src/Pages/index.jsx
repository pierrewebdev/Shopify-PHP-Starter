import {
    Card,
    Page,
    Layout,
    TextContainer,
    Image,
    VerticalStack,
    Link,
    Text,
  } from "@shopify/polaris";
  import { TitleBar } from "@shopify/app-bridge-react";
  import { useTranslation } from "react-i18next";
  
// Removed assets import as the file doesn't exist
// import { trophyImage } from "../assets";
  
  export default function HomePage() {
    const { t } = useTranslation();
    return (
      <Page narrowWidth>
        <TitleBar title={t("Test Shopify App")} primaryAction={null} />
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <VerticalStack
                spacing="4"
                align="end"
              >
                <div style={{width: '100%'}}>
                  <TextContainer spacing="loose">
                    <Text as="h2" variant="headingMd">
                      Welcome to your Shopify App
                    </Text>
                    <p> Here are some helpful links to get you started </p>
                      <div>
                        Shopify Polaris Documentation: <Link url="https://polaris.shopify.com/" external>Polaris</Link>
                      </div>
                      <div>
                        Shopify GraphQL Documentation: <Link url="https://shopify.dev/docs/api/admin-graphql" external>Admin API</Link></div>
                      <div>
                        Shopidy App Bridge Documentation: <Link url="https://shopify.dev/apps/tools/app-bridge" external>App Bridge</Link></div>

                    <p>Also here are some basic <Link url="https://shopify.dev/apps/getting-started/add-functionality" external>
                    tutorials </Link> from Shopify.
                    </p>
                  </TextContainer>
                </div>
                <div>
                </div>
              </VerticalStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
