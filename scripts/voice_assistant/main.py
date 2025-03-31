# voice_assistant/main.py


import time

from voice_assistant.audio import play_audio
from voice_assistant.text_to_speech import text_to_speech
from voice_assistant.utils import delete_file
from voice_assistant.config import Config
from voice_assistant.api_key_manager import get_tts_api_key

from voice_assistant.human_tts1 import human1_text_to_speech
from voice_assistant.human_tts2 import human2_text_to_speech


def convert_tts(message, filename, tts_api_key):
        # Convert the response text to speech and save it to the appropriate file
        text_to_speech(Config.TTS_MODEL, tts_api_key, message, filename, Config.LOCAL_MODEL_PATH)

        # Play the generated speech audio
        play_audio(filename)
        
        delete_file(filename)

def vendor_one_text_to_speech(message, filename, tts_api_key):
    human1_text_to_speech(Config.TTS_MODEL, tts_api_key, message, filename, Config.LOCAL_MODEL_PATH)
    play_audio(filename)
    delete_file(filename)

def vendor_two_text_to_speech(message, filename, tts_api_key):
    human2_text_to_speech(Config.TTS_MODEL, tts_api_key, message, filename, Config.LOCAL_MODEL_PATH)
    play_audio(filename)
    delete_file(filename)

import sys

def main():
    """
    Main function to run the voice assistant.
    """
    
    # # Rudraksh will speak - मैं रुद्राक्ष हूँ, मुझे बीस नट्स और बोल्ट्स की आवश्यकता है।

    welcome_message = """मैं एमेक्सस एआई की ओर से एक वेंडर सोर्सिंग एजेंट हूँ, जो न्यूनतम कीमत पर उत्पादों की खरीद के लिए रिवर्स बिडिंग में विशेषज्ञता रखती हूँ। मेरा काम उपयोगकर्ता से आवश्यकताएँ समझना, विक्रेताओं से संपर्क करना, और सबसे अच्छा सौदा तय करना है। """
    welcome_file = "welcome.mp3"
    tts_api_key = get_tts_api_key()
    convert_tts(message=welcome_message,
                filename=welcome_file,
                tts_api_key=tts_api_key)
    
    
    # time.sleep(4)
    # आज मैं आपकी कैसे मदद कर सकती हूँ?


    searching_message = "मैं आपके क्षेत्र में उच्च गुणवत्ता वाले नट्स और बोल्ट्स के भरोसेमंद विक्रेता की तलाश कर रही हूँ।"
    search_file = "search.mp3"
    convert_tts(message=searching_message,
                filename=search_file,
                tts_api_key=tts_api_key)
    
    # # time.sleep(2)
    

    get_info = """मुझे आपके क्षेत्र में नट्स और बोल्ट्स के विक्रेता मिल गए हैं। अब मैं प्रत्येक विक्रेता से एक-एक करके संपर्क करूंगी ताकि नट्स और बोल्ट्स की पूरी जानकारी और उनकी कीमत प्राप्त कर सकूं। जल्द ही मैं आपको सबसे बेहतरीन सौदे की जानकारी दूंगी!"""
    get_info_file = "info.mp3"
    convert_tts(message=get_info,
                filename=get_info_file,
                tts_api_key=tts_api_key)
    

    # First Vendor Calling
    first_vendor_message = "नमस्ते अमित, मुझे बीस नट्स और बोल्ट्स की आवश्यकता है। क्या आप नट्स और बोल्ट्स का विवरण और प्रति यूनिट कीमत प्रदान कर सकते हैं? कृपया जल्द से जल्द जानकारी साझा करें।"
    first_vendor_file = "first_vendor.mp3"
    convert_tts(message=first_vendor_message,
                filename=first_vendor_file,
                tts_api_key=tts_api_key)
    

    
    # # Amit will speak - मैं 20 नट्स और बोल्ट्स प्रदान कर सकता हूँ। 

    # # प्रकार: हेक्स नट्स और बोल्ट्स

    # # सामग्री: स्टेनलेस स्टील

    # # प्रति यूनिट कीमत: ₹10

    # # कुल कीमत (20 यूनिट के लिए): ₹200

    vendor_1_speak_message = """मैं बीस नट्स और बोल्ट्स प्रदान कर सकता हूँ। 

    प्रकार: हेक्स नट्स और बोल्ट्स

    सामग्री: स्टेनलेस स्टील

    प्रति यूनिट कीमत: दस रुपये

    कुल कीमत (बीस यूनिट के लिए): दो सौ रुपये"""
    
    vendor_1_speak_file = "vendor_1_speak.mp3"
    vendor_one_text_to_speech(message=vendor_1_speak_message,
                              filename=vendor_1_speak_file,
                              tts_api_key=tts_api_key)
    
    # time.sleep(7)
    
    
    first_vendor_thankyou_message = "धन्यवाद, अमित! आपका दिन शुभ हो।"
    first_vendor_thankyou_message_file = "first_vendor_thankyou.mp3"
    convert_tts(message=first_vendor_thankyou_message,
                filename=first_vendor_thankyou_message_file,
                tts_api_key=tts_api_key)
    

    # Second Vendor Calling
    second_vendor_message = "नमस्ते भाग्येश, मुझे बीस नट्स और बोल्ट्स की आवश्यकता है। क्या आप नट्स और बोल्ट्स का विवरण और प्रति यूनिट कीमत साझा कर सकते हैं? कृपया जल्द से जल्द जानकारी दें।"
    second_vendor_file = "second_vendor.mp3"
    convert_tts(message=second_vendor_message,
                filename=second_vendor_file,
                tts_api_key=tts_api_key)
    

    # Bhaagyesh will speak - मैं 20 नट्स और बोल्ट्स प्रदान कर सकता हूँ। 

    # प्रकार: हेक्स नट्स और बोल्ट्स

    # सामग्री: स्टेनलेस स्टील

    # प्रति यूनिट कीमत: ₹8

    # कुल कीमत (20 यूनिट के लिए): ₹160
    # time.sleep(7)

    vendor_2_speak_message = """मैं बीस नट्स और बोल्ट्स प्रदान कर सकता हूँ। 

    प्रकार: हेक्स नट्स और बोल्ट्स

    सामग्री: स्टेनलेस स्टील

    प्रति यूनिट कीमत: आठ रुपये

    कुल कीमत (बीस यूनिट के लिए): एक सौ साठ रुपये"""
    
    vendor_2_speak_file = "vendor_2_speak.mp3"
    vendor_two_text_to_speech(message=vendor_2_speak_message,
                              filename=vendor_2_speak_file,
                              tts_api_key=tts_api_key)
    
    
    second_vendor_thankyou_message = "धन्यवाद, भाग्येश! आपका दिन शुभ हो।"
    second_vendor_thankyou_message_file = "second_vendor_thankyou.mp3"
    convert_tts(message=second_vendor_thankyou_message,
                filename=second_vendor_thankyou_message_file,
                tts_api_key=tts_api_key)
    

    
    reverse_bidding_message = "मैं नट्स और बोल्ट्स के लिए सबसे अच्छे विक्रेता का चयन करने के लिए रिवर्स बिडिंग तकनीक का उपयोग कर रही हूँ, ताकि आपको सर्वोत्तम गुणवत्ता और कीमत मिल सके।"
    reverse_bidding_file = "reverse_bidding.mp3"
    convert_tts(message=reverse_bidding_message,
                filename=reverse_bidding_file,
                tts_api_key=tts_api_key)
    

    confirmation_message = "मुझे नट्स और बोल्ट्स के लिए सबसे बेहतरीन विक्रेता मिल गया है। अब मैं विक्रेता को कॉल कर रही हूँ ताकि उन्हें सूचित कर सकूं कि वही नट्स की आपूर्ति करेंगे। मैं आपको जल्द ही सभी विवरण भेजूंगी!"
    confirmation_file = "confirmation.mp3"
    convert_tts(message=confirmation_message,
                filename=confirmation_file,
                tts_api_key=tts_api_key)
    
    # calling vendor 2
    second_vendor_message2 = "नमस्ते भाग्येश, कृपया नट्स और बोल्ट्स भेजने की प्रक्रिया शुरू करें। अगर कोई अतिरिक्त जानकारी या अपडेट हो, तो मुझे तुरंत सूचित करें। धन्यवाद!"
    second_vendor_file2 = "vendor2.mp3"
    convert_tts(message=second_vendor_message2,
                filename=second_vendor_file2,
                tts_api_key=tts_api_key)
    

    # confirm to client
    client_message = "नमस्ते रुद्राक्ष, आपके नट्स और बोल्ट्स के लिए मुझे भाग्येश नामक विक्रेता मिल गया है। वह जल्द ही आपकी आवश्यकतानुसार नट्स और बोल्ट्स की आपूर्ति करेगा। यदि कोई अपडेट होता है, तो मैं आपको तुरंत सूचित करूंगी। धन्यवाद!"
    client_message_file = "vendor2.mp3"
    convert_tts(message=client_message,
                filename=client_message_file,
                tts_api_key=tts_api_key)
    


if __name__ == "__main__":
    main()