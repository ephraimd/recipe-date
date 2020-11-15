import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Linking } from 'react-native';
import { Left, Right, Body, Card, ListItem, List, Button, Icon, CardItem } from 'native-base';
import Carousel from 'react-native-snap-carousel';

function RecipeCard(props) {
    timeStar = { Lunch: '✳', Breakfast: '⭐', Dinner: '✴' };

    const handleClick = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                alert("Don't know how to open URI: " + url);
            }
        });
    }

    return (
        <Card style={{ height: Dimensions.get('window').height + 320, borderRadius: 10 }} key={props.index}>
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
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 30 }}>
                            <Button style={styles.youtube_button} onPress={()=> handleClick(props.recipe.youtube_link)}>
                                <Icon active type='FontAwesome' name="youtube" />
                                <Icon active type='FontAwesome' name="play" />
                            </Button>
                        </View>
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
                                    <Text style={{ fontSize: 16 }}>Procedure</Text>
                                </Body>
                            </ListItem>
                            {props.recipe.data.procedure.map((proc, index) => (
                                <ListItem key={index}>
                                    <Body>
                                        <Text style={{ fontWeight: "bold", fontSize: 12 }}>{proc.title}</Text>
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
        <RecipeCard index={index} currentView={props.currentCategory} recipe={item} />//print curent view
    );
    let carouselRef;
    return (
        <Carousel
            layout={'default'}
            data={props.recipeList}
            renderItem={_renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            itemLength={Dimensions.get('window').length}
        />
    );
}


const styles = StyleSheet.create({
    youtube_button: {
        marginTop: -45,
        paddingRight: 7,
        color: 'white',
        backgroundColor: 'rgba(255, 90, 91, 1.0)'
    }
});