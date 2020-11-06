import React from 'react';
import { Button } from 'native-base';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import RecipeCardsShowcase from "./RecipeCardsShowcase";
import Data from "../../data";//simulated data source

export default function ContentView(props) {
    const [currentRecipeList, setCurrentRecipeList] = React.useState(Data.categories[0].recipeList); //select the first one

    return (
        <View>
            <RecipeCardsShowcase currentView={props.currentView} recipeList={currentRecipeList} />
            <Carousel
                layout={'default'}
                data={Data.categories}
                renderItem={({ item, index }) => (
                    <View key={index} style={{ paddingTop: 20 }}>
                        <Button style={styles.categoryButton}>
                            <Text>{item.text}</Text>
                        </Button>
                    </View>
                )}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={150}
                onSnapToItem={(index) => {
                    setCurrentRecipeList(Data.categories[index].recipeList);
                }}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    categoryButton: {
        backgroundColor: '#FF785B',
        paddingTop: 30,
        paddingBottom: 30,
        paddingHorizontal: 40,
        borderRadius: 20
    }
});