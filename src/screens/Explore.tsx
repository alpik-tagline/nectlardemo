import React, {useRef, useState} from 'react';

import backet from '../images/backet.png';
import iols from '../images/oils.png';
import fish from '../images/fish.png';
import snack from '../images/snack.png';
import egg from '../images/egg.png';
import allg from '../images/allS.png';

import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import search from '../images/search.png';
import filter from '../images/filter.png';
import cancelB from '../images/blackCancel.png';
import checkIcon from '../images/righticon.png';

import RBSheet from 'react-native-raw-bottom-sheet';
import {useNavigation} from '@react-navigation/native';

const Explore = () => {
  const refRBSheet = useRef();
  const [selectedFilters, setSelectedFilters] = useState({});
  const navigation = useNavigation();

  const toggleCheckbox = key => {
    setSelectedFilters(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderCheckbox = (label, key) => (
    <View style={styles.checkboxRow}>
      <TouchableOpacity
        onPress={() => toggleCheckbox(key)}
        style={[
          styles.customCheckbox,
          selectedFilters[key] && styles.customCheckboxChecked,
        ]}>
        {selectedFilters[key] && (
          <Image source={checkIcon} style={styles.checkIcon} />
        )}
      </TouchableOpacity>
      <View>
        <Text style={styles.labelText}>{label}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Products</Text>
      <View style={styles.search}>
        <Image source={search} style={styles.icon} />
        <TextInput
          placeholder="Search Store"
          placeholderTextColor="#7C7C7C"
          style={{
            fontWeight: '500',
          }}
        />
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <Image source={filter} style={styles.filters} />
        </TouchableOpacity>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.5)',
            },
            draggableIcon: {
              backgroundColor: '#ccc',
            },
            container: {
              height: '100%',
            },
          }}>
          <View style={styles.containerRb}>
            <View style={styles.firstCon}>
              <TouchableOpacity onPress={() => refRBSheet.current.close()}>
                <Image source={cancelB} style={styles.cancelImg} />
              </TouchableOpacity>
              <Text style={styles.filterTxt}>Filters</Text>
            </View>

            <View style={styles.containerNew}>
              <Text style={styles.catTxt}>Categories</Text>
              {renderCheckbox('Fruits', 'fruits')}
              {renderCheckbox('Noodle', 'noodle')}
              {renderCheckbox('Fast Food', 'fast_food')}
              {renderCheckbox('Eggs', 'eggs')}

              <View style={styles.newCat}>
                <Text style={styles.brandTxt}>Brand</Text>
                {renderCheckbox('Collection', 'collection')}
                {renderCheckbox('Cocola', 'cocola')}
                {renderCheckbox('New Foods', 'new_foods')}
                {renderCheckbox('Farmas', 'farmas')}
              </View>
              <View style={styles.newbtn}>
                <TouchableOpacity style={styles.btnBg}>
                  <Text style={styles.btn}>Apply Filter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </RBSheet>
      </View>
      <View style={styles.all}>
        <View style={styles.allImgs}>
          <View style={styles.oneBg}>
            <TouchableOpacity onPress={() => navigation.navigate('Allinone')}>
              <Image source={backet} style={styles.inside} />
              <Text style={styles.txt}>Fruits</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.allImgs}>
          <View style={styles.twoBg}>
            <TouchableOpacity onPress={() => navigation.navigate('Allinone')}>
              <Image source={iols} style={styles.inside} />
              <Text style={styles.txtO}>Oil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.all}>
        <View style={styles.allImgs}>
          <View style={styles.threeBg}>
            <TouchableOpacity onPress={() => navigation.navigate('Allinone')}>
              <Image source={fish} style={styles.inside} />
              <Text style={styles.txt}>Meat & Fish</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.allImgs}>
          <View style={styles.fourBg}>
            <TouchableOpacity onPress={() => navigation.navigate('Allinone')}>
              <Image source={snack} style={styles.inside} />
              <Text style={styles.txtS}>Snacks</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.all}>
        <View style={styles.allImgs}>
          <View style={styles.fiveBg}>
            <TouchableOpacity onPress={() => navigation.navigate('Allinone')}>
              <Image source={egg} style={styles.inside} />
              <Text style={styles.txt}>Daily & Eggs</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.allImgs}>
          <View style={styles.sixBg}>
            <TouchableOpacity onPress={() => navigation.navigate('Allinone')}>
              <Image source={allg} style={styles.inside} />
              <Text style={styles.txtS}>Beverages</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  checkIcon: {
    marginTop: 4,
    alignSelf: 'center',
  },
  cancelImg: {
    marginLeft: 18,
  },
  labelText: {
    color: '#181725',
    fontWeight: '700',
    fontFamily: 'Gilroy-Medium',
  },
  newbtn: {},
  btnBg: {
    backgroundColor: '#53B175',
    height: 67,
    width: 353,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 27,
    borderRadius: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  btn: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  newCat: {
    paddingBottom: 265,
  },
  brandTxt: {
    fontFamily: 'Gilroy',
    fontWeight: '700',
    fontSize: 22,
    marginTop: 50,
    marginLeft: 20,
  },
  customCheckbox: {
    width: 23,
    height: 23,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#F2F3F2',
    marginRight: 10,
  },
  customCheckboxChecked: {
    backgroundColor: '#53B175',
    borderColor: '#53B175',
  },
  firstCon: {
    flexDirection: 'row',
  },
  filters: {
    marginLeft: 215,
  },
  containerNew: {
    backgroundColor: '#F2F3F2',
    borderRadius: 30,
    marginTop: 25,
    flexDirection: 'column',
    paddingBottom: 20,
  },
  catTxt: {
    fontFamily: 'Gilroy',
    fontWeight: '700',
    fontSize: 22,
    marginTop: 20,
    marginLeft: 20,
  },
  filterTxt: {
    marginLeft: 150,
    fontFamily: 'Gilroy-Bold',
    fontWeight: '800',
    fontSize: 18,
  },
  title: {
    fontFamily: 'Gilroy-Bold',
    fontWeight: '700',
    fontSize: 18,
    marginTop: 35,
    textAlign: 'center',
  },
  containerRb: {
    flex: 1,
  },
  search: {
    marginTop: 20,
    backgroundColor: '#F2F3F2',
    width: 330,
    marginLeft: 25,
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 13,
    marginRight: 10,
  },
  allImgs: {
    paddingHorizontal: 8,
    marginVertical:6,
    justifyContent: 'center',
  },
  all: {
    flexDirection: 'row',
    marginTop: 5,
    paddingHorizontal:16,
  },
  oneBg: {
    height: 180,
    width: 170,
    borderRadius: 10,
    backgroundColor: '#53B1751A',
    marginLeft: 1,
    borderColor: 'green',
    borderWidth: 0.8,
  },
  inside: {
    marginTop: 15,
    alignSelf: 'center',
  },
  txt: {
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Gilroy-Bold',
    fontSize: 20,
    fontWeight: '700',
  },
  twoBg: {
    backgroundColor: '#F8A44C1A',
    borderColor: 'orange',
    borderWidth: 0.8,
    height: 180,
    width: 170,
    borderRadius: 10,
  },
  txtO: {
    textAlign: 'center',
    fontFamily: 'Gilroy-Bold',
    fontSize: 20,
    fontWeight: '700',
  },
  threeBg: {
    backgroundColor: '#F7A59340',
    borderColor: '#F7A593',
    borderWidth: 0.8,
    height: 180,
    width: 170,
    borderRadius: 10,
  },
  fourBg: {
    backgroundColor: '#D3B0E040',
    borderColor: '#D3B0E0',
    borderWidth: 0.8,
    height: 180,
    width: 170,
    borderRadius: 10,
  },
  txtS: {
    textAlign: 'center',
    fontFamily: 'Gilroy-Bold',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
  },
  fiveBg: {
    backgroundColor: '#FDE59840',
    borderColor: '#FDE598',
    borderWidth: 0.8,
    height: 180,
    width: 170,
    borderRadius: 10,
  },
  sixBg: {
    backgroundColor: '#B7DFF540',
    borderColor: '#B7DFF5',
    borderWidth: 0.8,
    height: 180,
    width: 170,
    borderRadius: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20,
  },
  checkboxTick: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 2,
  },
});
