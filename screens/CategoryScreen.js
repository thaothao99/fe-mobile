import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Context as AuthContext } from '../context/AuthContext';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import WishListItemComponent from '../components/WishListItemComponent';
import ListOderComponent from '../components/ListOderComponent';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import CategoryItemComponent from '../components/CategoryItemComponent';
import { navigate } from '../utils/navigationRef';

const data = {
  name: 'Running',
  img:
    'https://image-us.eva.vn/upload/4-2019/images/2019-10-15/vo-tu-thu-son-tai-han-quoc-ngoc-trinh-bi-dan-tinh-nem-da-khong-thuong-tiec-fni1552807902-1571123246-312-width600height900.jpg',
};

const styles = StyleSheet.create({
  Item2: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  SearchContainer: {
    height: 80,
    backgroundColor: '#1d1d1d',
    justifyContent: 'center',
    paddingTop: 23,
    paddingLeft: 5,
    paddingRight: 5,
  },
  TitleType: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
    marginLeft: 20,
  },
});

const CategoryScreen = props => {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'space-around',
        // alignItems: 'center',
        // flexDirection: 'row',
      }}
    >
      <View style={styles.SearchContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Search');
          }}
        >
          <View
            style={{
              height: 45,
              backgroundColor: '#FFF',
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 25,
            }}
          >
            <Ionicons
              name={'ios-search'}
              size={30}
              color="#3d3d3d"
              style={{ padding: 10 }}
            />
            <Text style={{ fontSize: 15 }}>Search</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* ===============BRAND============== */}
      <ScrollView style={{ padding: 10 }}>
        <Text style={styles.TitleType}>Brand</Text>
        <View style={styles.Item2}>
          <CategoryItemComponent
            title="Nike"
            img="https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_1280.jpg"
            handleOnpress={searchItems('Nike')}
          />
          <CategoryItemComponent
            title="Adidas"
            img="https://cdn.pixabay.com/photo/2016/11/23/17/17/adidas-1853899_1280.jpg"
            handleOnpress={searchItems('Adidas')}
          />
        </View>
        <View style={styles.Item2}>
          <CategoryItemComponent
            title="Reebok"
            img="https://cdn.pixabay.com/photo/2014/04/25/20/34/sneakers-332128_1280.jpg"
            handleOnpress={searchItems('Reebok')}
          />
          <CategoryItemComponent
            title={`Biti's`}
            img="https://c.static-nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/u1pc2awdr0feaemheohp/zoom-pegasus-turbo-shield-running-shoe-7PchpQ.jpg"
            handleOnpress={searchItems(`Biti's`)}
          />
        </View>
        {/* =============TYPE=============== */}
        <Text style={styles.TitleType}>Type</Text>
        <View style={styles.Item2}>
          <CategoryItemComponent
            title="LifeStyle"
            img="https://cdn.pixabay.com/photo/2016/10/21/14/48/light-painting-1758192_1280.jpg"
            handleOnpress={searchItems('Lifestyle', 'categories', 'in')}
          />
          <CategoryItemComponent
            title="Running"
            img="https://cdn.pixabay.com/photo/2014/04/10/18/39/running-shoe-321199_1280.jpg"
            handleOnpress={searchItems('Running', 'categories', 'in')}
          />
        </View>
        <View style={styles.Item2}>
          <CategoryItemComponent
            title="Fashion"
            img="https://cdn.pixabay.com/photo/2014/05/21/14/54/feet-349687_1280.jpg"
            handleOnpress={searchItems('Fashion', 'categories', 'in')}
          />
          <CategoryItemComponent
            title="Training-Gym"
            img="https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2143982/2018/10/3/7e1e6af7-736d-4107-a237-1ebee37379eb1538555622207-HRX-by-Hrithik-Roshan-Men-Grey-Training-Shoes-89115385556218-1.jpg"
            handleOnpress={searchItems('Trainer', 'categories', 'in')}
          />
        </View>
        <View style={styles.Item2}>
          <CategoryItemComponent
            title="Boost"
            img="https://cache.mrporter.com/variants/images/3983529957977916/fr/w560_q80.jpg"
            handleOnpress={searchItems('Boost', 'categories', 'in')}
          />
          <CategoryItemComponent
            title="Other"
            img="https://c.static-nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/salis6eyc5s6wjme1dh4/custom-nike-metcon-5-by-you.jpg"
            handleOnpress={searchItems('', 'categories', 'in')}
          />
        </View>
        {/*==================================== */}
      </ScrollView>
    </View>
  );
};

export default CategoryScreen;

const searchItems = (att, field = 'brand', type = 'regex') => () => {
  navigate('CategoryResult', {
    title: att,
    search: att,
    type,
    field,
  });
};
