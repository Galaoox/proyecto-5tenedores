import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Icon} from "react-native-elements";
import {colors} from "../../theme/colors";
import {firebaseApp} from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import {size} from "lodash";
import ListRestaurants from "../../components/Restaurants/ListRestaurants";

const db = firebase.firestore(firebaseApp);

export default function Restaurants(props) {
    const {navigation} = props;
    const [user, setUser] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [totalRestaurants, setTotalRestaurants] = useState(0);
    const [startRestaurants, setStartRestaurants] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const limitRestaurants = 10;
    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            setUser(userInfo);
        });
    }, []);
    /**
     * Obtiene los datos de los restaurantes que se encuentran en la bd
     */
    const getRestaurants = () => {
        db.collection("restaurants")
            .get()
            .then((result) => setTotalRestaurants(size(result)));

        db.collection("restaurants")
            .orderBy("createAt", "desc")
            .limit(limitRestaurants)
            .get()
            .then(async (result) => {
                setStartRestaurants(result.docs[result.docs.length - 1]);
                const restaurantsMap = result.docs.map((doc) => {
                    const data = doc.data();
                    data.id = doc.id; // inserto el id del restaurante en la data;
                    return data;
                })
                setRestaurants(restaurantsMap);
            });
    };

    useEffect(() => {
        getRestaurants();
    }, []);

    const handleLoadMore = () => {
        restaurants.length < totalRestaurants && setIsLoading(true);
        db.collection('restaurants')
            .orderBy('createAt', 'desc')
            .startAfter(startRestaurants.data().createAt)
            .limit(limitRestaurants).get()
            .then(result => {
                result.docs.length > 0 ? setStartRestaurants(result.docs[result.docs.length - 1])
                    : setIsLoading(false);
                setRestaurants([...restaurants,
                    result.docs.map((doc) => {
                        const data = doc.data();
                        data.id = doc.id; // inserto el id del restaurante en la data;
                        return data;
                    })
                ]);
            })
    }

    return (
        <View style={styles.viewBody}>
            <ListRestaurants restaurants={restaurants} handleMore={handleLoadMore} isLoading={isLoading}/>

            {user && (
                <Icon
                    reverse
                    type="material-community"
                    name="plus"
                    color={colors.green}
                    containerStyle={styles.btnContainer}
                    onPress={() => {
                        navigation.navigate("add-restaurant");
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: colors.white,
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
    },
});
