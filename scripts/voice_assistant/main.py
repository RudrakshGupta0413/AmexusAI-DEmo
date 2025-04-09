# voice_assistant/main.py


import time
import sys

from voice_assistant.audio import play_audio
from voice_assistant.text_to_speech import text_to_speech
from voice_assistant.utils import delete_file
from voice_assistant.config import Config
from voice_assistant.api_key_manager import get_tts_api_key

from voice_assistant.human_tts1 import human1_text_to_speech
from voice_assistant.human_tts2 import human2_text_to_speech
from voice_assistant.client_tts import client_text_to_speech

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

def process_client_speech(message, filename, tts_api_key):
    client_text_to_speech(Config.TTS_MODEL, tts_api_key, message, filename, Config.LOCAL_MODEL_PATH)
    play_audio(filename)
    delete_file(filename)

def main():
    """
    Main function to run the voice assistant.
    """

    tts_api_key = get_tts_api_key()

    client_message = "I am Anil, I need twenty nuts and bolts."
    client_file = "client.mp3"
    process_client_speech(message=client_message,
                          filename=client_file,
                          tts_api_key=tts_api_key)
    # sys.exit()

    welcome_message = """I am a vendor sourcing agent from Amexus AI, specializing in reverse bidding for purchasing products at minimum prices. My job is to understand requirements from users, contact vendors, and negotiate the best deal."""
    welcome_file = "welcome.mp3"
    convert_tts(message=welcome_message,
                filename=welcome_file,
                tts_api_key=tts_api_key)
    
    
    
    searching_message = "I am looking for reliable vendors of high-quality nuts and bolts in your area."
    search_file = "search.mp3"
    convert_tts(message=searching_message,
                filename=search_file,
                tts_api_key=tts_api_key)
    
    

    get_info = """I have found vendors for nuts and bolts in your area. Now I will contact each vendor one by one to get complete information about nuts and bolts and their prices. Soon I will provide you with the best deal information!"""
    get_info_file = "info.mp3"
    convert_tts(message=get_info,
                filename=get_info_file,
                tts_api_key=tts_api_key)
    

    # First Vendor Calling
    first_vendor_message = "Hello Amit, I need twenty nuts and bolts. Can you provide details about the nuts and bolts and the price per unit? Please share the information as soon as possible."
    first_vendor_file = "first_vendor.mp3"
    convert_tts(message=first_vendor_message,
                filename=first_vendor_file,
                tts_api_key=tts_api_key)
    

    vendor_1_speak_message = """I can provide twenty nuts and bolts.

    Type: Hex nuts and bolts

    Material: Stainless Steel

    Price per unit: Ten rupees

    Total price (for twenty units): Two hundred rupees"""
    
    vendor_1_speak_file = "vendor_1_speak.mp3"
    vendor_one_text_to_speech(message=vendor_1_speak_message,
                              filename=vendor_1_speak_file,
                              tts_api_key=tts_api_key)

    
    
    first_vendor_thankyou_message = "Thank you, Amit! Have a good day."
    first_vendor_thankyou_message_file = "first_vendor_thankyou.mp3"
    convert_tts(message=first_vendor_thankyou_message,
                filename=first_vendor_thankyou_message_file,
                tts_api_key=tts_api_key)
    

    # Second Vendor Calling
    second_vendor_message = "Hello Bhagyesh, I need twenty nuts and bolts. Can you share details about the nuts and bolts and the price per unit? Please provide the information as soon as possible."
    second_vendor_file = "second_vendor.mp3"
    convert_tts(message=second_vendor_message,
                filename=second_vendor_file,
                tts_api_key=tts_api_key)
    


    vendor_2_speak_message = """I can provide twenty nuts and bolts.

    Type: Hex nuts and bolts

    Material: Stainless Steel

    Price per unit: Eight rupees

    Total price (for twenty units): One hundred sixty rupees"""
    
    vendor_2_speak_file = "vendor_2_speak.mp3"
    vendor_two_text_to_speech(message=vendor_2_speak_message,
                              filename=vendor_2_speak_file,
                              tts_api_key=tts_api_key)
    
    
    second_vendor_thankyou_message = "Thank you, Bhagyesh! Have a good day."
    second_vendor_thankyou_message_file = "second_vendor_thankyou.mp3"
    convert_tts(message=second_vendor_thankyou_message,
                filename=second_vendor_thankyou_message_file,
                tts_api_key=tts_api_key)
    

    
    reverse_bidding_message = "I am using reverse bidding technique to select the best vendor for nuts and bolts, to ensure you get the best quality and price."
    reverse_bidding_file = "reverse_bidding.mp3"
    convert_tts(message=reverse_bidding_message,
                filename=reverse_bidding_file,
                tts_api_key=tts_api_key)
    

    confirmation_message = "I have found the best vendor for nuts and bolts. Now I am calling the vendor to inform them that they will be supplying the nuts. I will send you all the details soon!"
    confirmation_file = "confirmation.mp3"
    convert_tts(message=confirmation_message,
                filename=confirmation_file,
                tts_api_key=tts_api_key)
    
    # calling vendor 2
    second_vendor_message2 = "Hello Bhagyesh, please start the process of sending the nuts and bolts. If there is any additional information or updates, please inform me immediately. Thank you!"
    second_vendor_file2 = "vendor2.mp3"
    convert_tts(message=second_vendor_message2,
                filename=second_vendor_file2,
                tts_api_key=tts_api_key)
    

    # confirm to client
    client_message = "Hello Anil, I have found a vendor named Bhagyesh for your nuts and bolts. He will soon supply the nuts and bolts as per your requirements. If there are any updates, I will inform you immediately. Thank you!"
    client_message_file = "return_client.mp3"
    convert_tts(message=client_message,
                filename=client_message_file,
                tts_api_key=tts_api_key)
    


if __name__ == "__main__":
    main()