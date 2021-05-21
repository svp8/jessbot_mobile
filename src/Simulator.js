import React, {useState, useEffect} from 'react'
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView, 
    LayoutAnimation,
    Modal
} from 'react-native'

const CONTENT = [
    {
        isExpanded: false,
        category_name:'Стратегия',
        subcategory:[
            {id:1, val:'if'},
            {id:2, val: 'loop'},
            {id:3, val: 'sell'}
        ]
    },
    {
        isExpanded: false,
        category_name:'Покупка',
        subcategory:[
            {id:4, val:'limit'},
            {id:5, val: 'limit-min'},
            {id:6, val: 'limit-max'},
            {id:7, val: 'market-min'},
            {id:8, val: 'market-max'},
            {id:9, val: 'indicator'},
            {id:10, val: 'signal'}
        ]
    },
    {
        isExpanded: false,
        category_name:'Take Profit',
        subcategory:[
            {id:11, val:'limit-max'},
            {id:12, val: 'market-max'},
            {id:13, val:'indicator'},
            {id:14, val:'signal'}
        ]
    },
    {
        isExpanded: false,
        category_name:'Stop Loss',
        subcategory:[
            {id:15, val:'market-min'},
            {id:17, val: 'simple-trailing-sl'},
            {id:18, val: 'trailing-sl'},
            {id:19, val: 'limit-min'}
        ]
    }
];

const ExpandableComponent = ({item, onCkickFunction}) => {
    const[layoutHeight, setlayoutHeight]= useState(0);

    useEffect(() => {
        if (item.isExpanded) {
            setlayoutHeight(null);
        } else {
            setlayoutHeight(0);
        }
    }, [item.isExpanded])

    return (
        <View style={{paddingBottom:15}}>
            <TouchableOpacity
            style={styles.item}
            onPress={onCkickFunction}
            >
                <Text style={styles.itemText}>
                    {item.category_name}
                </Text>
            </TouchableOpacity>
        <View 
        style={{
        height:layoutHeight,
        overflow: 'hidden',
        }} 
        >
            {
                item.subcategory.map((item,key)=>(
                    <TouchableOpacity
                        key={key}
                        style={styles.subcontent}
                        
                    >
                        <Text style={styles.text}>
                            {item.val}
                        </Text>
                        <View style={styles.separator}/>
                    </TouchableOpacity>
                ))
            }
        
        </View>
        </View>
    )
}


export const Simulator = props => {
    const [multiSelect, setmultiSelect]=useState(false);
    const [listDataSource, setlistDataSource]=useState(CONTENT)

    const updateLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...listDataSource];
        if (multiSelect){
            //if multiple select is enabled
            array[index]['isExpanded']=!array[index]['isExpanded'];
        } else {
            //if single select is enabled
            array.map((value, placeindex)=>
            placeindex===index
            ?(array[placeindex]['isExpanded']) = !array[placeindex]['isExpanded']
            :(array[placeindex]['isExpanded'])=false
            );
        }
        setlistDataSource(array)
    }

return (
    <ScrollView>
        <View style={styles.content}>

            <View style={styles.button}>
            <TouchableOpacity onPress = {() => {/* do this */}}>
            <View style = {{backgroundColor: '#3498db', alignItems: 'center', 
                    justifyContent: 'flex-end', borderRadius: 8, padding:20}}>
            <Text style = {styles.buttontext}>Импорт формулы</Text>
            </View>
            </TouchableOpacity>
            </View>

            <ScrollView>
                {
                    listDataSource.map((item,key) => (
                    <ExpandableComponent
                        key={item.category_name}
                        item={item}
                        onCkickFunction={()=> {
                            updateLayout(key)
                        }}
                        />
                    ))
                }
            </ScrollView>
        

        <View style={{paddingTop:150}}>
            <View style={styles.button}>
            <TouchableOpacity onPress = {() => {/* do this */}}>
            <View style = {{backgroundColor: '#16a085', alignItems: 'center', 
                    justifyContent: 'flex-end', borderRadius: 8, paddingTop:10, paddingBottom:10}}>
            <Text style = {styles.buttontext}>Создать Алго</Text>
            </View>
            </TouchableOpacity>
            </View>
        </View>
        <View>
            <View style={styles.button}>
            <TouchableOpacity onPress = {() => {/* do this */}}>
            <View style = {{backgroundColor: '#bdc3c7', alignItems: 'center', 
                    justifyContent: 'flex-end', borderRadius: 8, paddingTop:10, paddingBottom:10}}>
            <Text style = {styles.buttontext}>Назад к списку</Text>
            </View>
            </TouchableOpacity>
            </View>
        </View>
    </View>
    </ScrollView>
)   
}



const styles = StyleSheet.create({
    content: {
        flexDirection: 'column',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
    },
    subcontent: {
        flexDirection: 'column',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        paddingTop: 15,
    },
    text: {
        color: 'black',
        fontSize: 16,
    },
    buttontext: {
        color: 'white',
        fontSize: 16,
    },
    tinylogo: {
        width:25,
        height:25,
    },
    input: {
        height: 40,
        width: '70%',
        padding: 5,
        paddingBottom: 10,
        backgroundColor: '#f4f6f6',
        borderColor: '#f5f7f7',
        borderRadius: 6,
        borderWidth: 1,
        fontSize: 16,
        alignItems:'center',
    },
    icontext:{
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 10
    },
   button:{
        paddingTop: '5%',
        paddingBottom: 20        
   },
   item:{
       backgroundColor: '#16a085',
       padding: 20,
       borderRadius: 8,
       alignItems:'center',
   },
   itemText:{
        fontSize:16,
        fontWeight: '500',
        color:'white', 
   },
   separator:{
    height:1,
    backgroundColor:'#c8c8c8',
    width: '100%'
   },
   headerButton:{
       textAlign:'center',
       justifyContent:'center',
       fontSize:18,
   }
})