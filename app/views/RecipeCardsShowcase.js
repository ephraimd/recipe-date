import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { Left, Right, Body, Card, ListItem, List, Button, Icon, CardItem } from 'native-base';
import Carousel from 'react-native-snap-carousel';

function RecipeCard(props) {
    timeStar = {Lunch: '✳', Breakfast:'⭐', Dinner: '✴'};

    return (
        <Card style={{ height: Dimensions.get('window').height-147, borderRadius: 20, borderColor: '#DEE8FF', borderWidth: 1 }} key={props.index}>
            <CardItem>
                <Left>
                    <Body>
                        <Text style={{ fontSize: 19, fontWeight: 'bold' }}>{props.recipe.title}</Text>
                        <Text note>{timeStar[props.currentView]} {props.currentView}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem cardBody style={{ flex: 1, flexDirection: 'column', padding: 0 }}>
                <ScrollView contentContainerStyle={{ width: Dimensions.get('window').width, padding: 10 }}>
                    <View>
                        <Image source={props.recipe.image} style={{ height: 200, width: Dimensions.get('window').width - 50, flex: 1 }} />
                        <List style={{ paddingTop: 10 }}>
                            <ListItem itemHeader first icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#025181" }}>
                                        <Icon active name="star" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text style={{ fontSize: 19 }}>Ingredients</Text>
                                </Body>
                            </ListItem>
                            {props.recipe.data.ingredients.map((ing, index) => (
                                <ListItem key={index}>
                                    <Body>
                                        <Text>✔ {ing}</Text>
                                    </Body>
                                </ListItem>
                            ))}

                            <ListItem itemDivider></ListItem>
                            <ListItem itemHeader first icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#333E4C" }}>
                                        <Icon type='FontAwesome' active name="gear" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text style={{ fontSize: 19 }}>Procedure</Text>
                                </Body>
                            </ListItem>
                            {props.recipe.data.procedure.map((proc, index) => (
                                <ListItem key={index}>
                                    <Body>
                                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>{proc.title}</Text>
                                        <Text note>{proc.description}</Text>
                                    </Body>
                                </ListItem>
                            ))}
                        </List>
                    </View>
                </ScrollView>
            </CardItem>
        </Card>
    );
}

export default function RecipeCardsShowcase(props) {
    const _renderItem = ({ item, index }) => (
        <RecipeCard index={index} currentView={props.currentCategory} recipe={item} />
    );
    return (
        <Carousel
            layout={'stack'}
            data={props.recipeList}
            renderItem={_renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width - 20}
        />
    );
}
