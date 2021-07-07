import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Avatar, Rating } from 'react-native-elements';
import { db } from '../../utils/firebase';
import firebase from 'firebase/app';
import { create } from 'lodash';


export default function ListReviews(props) {
    const { navigation, idRestaurant } = props;
    const [userLogged, setUserLogged] = useState(false);
    const [reviews, setReviews] = useState([]);
    firebase.auth().onAuthStateChanged((user) => {
        setUserLogged(!!user);
    })

    useEffect(() => {
        db.collection('reviews')
            .where("idRestaurant", "==", idRestaurant)
            .get()
            .then((response) => {
                const dataReviews = [];
                response.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    dataReviews.push(data);
                })
                setReviews(dataReviews);
            })
    }, []);

    return (
        <View>
            {userLogged ? (
                <Button
                    title="Escribe una opinión"
                    buttonStyle={styles.btnAddReview}
                    titleStyle={styles.btnTitleAddReview}
                    icon={{
                        type: 'material-community',
                        name: 'square-edit-outline',
                        color: '#0068a0'
                    }}
                    onPress={() => navigation.navigate('add-review-restaurant', { idRestaurant })}
                />
            ) : (
                    <View>
                        <Text
                            style={{ textAlign: 'center', color: '#00a680', padding: 20 }}
                            onPress={() => navigation.navigate('login')}
                        >Para escribir un comentario es necesario iniciar sesión{" "}
                            <Text style={{ fontWeight: 'bold' }}>
                                Presiona aqui para iniciar sesión
                        </Text>
                        </Text>
                    </View>
                )}

            {
                reviews.map((review, index) => (
                    <Review key={index} data={review} />
                ))
            }
        </View>
    )
}

function Review(props) {
    const { title, review, createAt, avatarUser, rating } = props.data;
    const createReview = new Date(createAt.seconds * 1000);
    return (
        <View style={styles.viewReview}>
            <View style={styles.viewImageAvatar}>
                <Avatar
                    size="large"
                    rounded
                    containerStyle={styles.imageAvatarUser}
                    source={avatarUser ? { uri: avatarUser } : require('../../../assets/img/avatar-default.jpg')}
                />
            </View>
            <View style={styles.viewInfo}>
                <Text style={styles.reviewTitle}>{title}</Text>
                <Text style={styles.reviewText}>{review}</Text>
                <Rating
                    imageSize={15}
                    startingValue={rating}
                    readonly
                />
                <Text style={styles.reviewDate} >
                    {createReview.getDate()}/{createReview.getMonth() + 1}/{createReview.getFullYear()}
                    - {createReview.getHours()}:{createReview.getMinutes() < 10 ? '0' : ""}
                    {createReview.getMinutes()}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnAddReview: {
        backgroundColor: 'transparent'
    },
    btnTitleAddReview: {
        color: '#00a680',
    },
    viewReview: {
        flexDirection: 'row',
        padding: 10,
        paddingBottom: 20,
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 1
    },
    viewImageAvatar: {
        marginRight: 15
    },
    imageAvatarUser: {
        width: 50,
        height: 50
    },
    viewInfo: {
        flex: 1,
        alignItems: "flex-start"
    },
    reviewTitle: {
        fontWeight: 'bold'
    },
    reviewText: {
        paddingTop: 2,
        color: 'grey',
        marginBottom: 5
    },
    reviewDate: {
        marginTop: 5,
        fontSize: 12,
        color: 'grey',
        position: "absolute",
        right: 0,
        bottom: 0
    }
})
