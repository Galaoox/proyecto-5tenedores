import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AirbnbRating, Button, Input } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import { db } from '../../utils/firebase';
import firebase from 'firebase/app';
import { update } from 'lodash';
import { result } from 'lodash';


export default function AddReviewRestaurant(props) {
    const { navigation, route } = props;
    const { idRestaurant } = route.params;
    const [rating, setRating] = useState(null);
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);
    const toastRef = useRef();


    const addReview = () => {
        if (!rating) {
            toastRef.current.show("No has dado ninguna puntuación");
        }
        else if (!title) {
            toastRef.current.show("El titulo es obligatorio");
        }
        else if (!review) {
            toastRef.current.show("El comentario es obligatorio");
        } else {
            setLoading(true);
            const user = firebase.auth().currentUser;
            const paylod = {
                idUser: user.uid,
                avatarUser: user.photoURL,
                idRestaurant: idRestaurant,
                title: title,
                review: review,
                rating: rating,
                createAt: new Date(),
            }
            db.collection('reviews').add(paylod)
                .then(() => {
                    updateRestaurant();
                })
                .catch(() => {
                    toastRef.current.show("Error al enviar le comentario");
                    setLoading(false);
                });
        }
    }
    const updateRestaurant = () => {
        const restaurantRef = db.collection('restaurants').doc(idRestaurant);

        restaurantRef.get()
            .then((response) => {
                const restaurantData = response.data();
                const ratingTotal = restaurantData.ratingTotal + rating;
                const quantityVoting = restaurantData.quantityVoting + 1;
                const ratingResult = ratingTotal / quantityVoting;
                restaurantRef.update({
                    rating: ratingResult,
                    ratingTotal,
                    quantityVoting
                }).then(() => {
                    setLoading(false);
                    navigation.goBack();
                })
            });
    }


    return (
        <View style={styles.viewBody}>
            <View style={styles.viewRating}>
                <AirbnbRating
                    count={5}
                    reviews={["Pésimo", "Deficiente", "Normal", "Muy Bueno", "Excelente"]}
                    defaultRating={0}
                    size={35}
                    onFinishRating={(value) => setRating(value)}
                />
            </View>
            <View style={styles.formReview}>
                <Input
                    placeholder="Titulo"
                    containerStyle={styles.input}
                    onChangeText={(value) => setTitle(value)}

                />
                <Input
                    placeholder="Comentario..."
                    multiline={true}
                    inputContainerStyle={styles.textArea}
                    onChangeText={(value) => setReview(value)}
                />
                <Button
                    title="Enviar Comentario"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={addReview}
                />
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={loading} text="ENVIANDO COMENTARIO" />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    viewRating: {
        height: 110,
        backgroundColor: '#f2f2f2'
    },
    formReview: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
        marginTop: 40
    },
    input: {
        marginBottom: 10
    },
    textArea: {
        height: 120,
        width: "100%",
        padding: 0,
        margin: 0
    },
    btnContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: 20,
        marginBottom: 10,
        width: '95%'
    },
    btn: {
        backgroundColor: '#00a680'
    }
})
