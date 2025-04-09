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

def convert_tts(message, filename, tts_api_key, speaker="Assistant"):
    print(f"\n🎙️ {speaker} is speaking: {message}")
    text_to_speech(Config.TTS_MODEL, tts_api_key, message, filename, Config.LOCAL_MODEL_PATH)
    play_audio(filename)
    delete_file(filename)

def vendor_one_text_to_speech(message, filename, tts_api_key):
    print(f"\n🗣️ Vendor 1 (Amit) is speaking: {message}")
    human1_text_to_speech(Config.TTS_MODEL, tts_api_key, message, filename, Config.LOCAL_MODEL_PATH)
    play_audio(filename)
    delete_file(filename)

def vendor_two_text_to_speech(message, filename, tts_api_key):
    print(f"\n🗣️ Vendor 2 (Bhagyesh) is speaking: {message}")
    human2_text_to_speech(Config.TTS_MODEL, tts_api_key, message, filename, Config.LOCAL_MODEL_PATH)
    play_audio(filename)
    delete_file(filename)

def process_client_speech(message, filename, tts_api_key):
    print(f"\n👤 Client is speaking: {message}")
    client_text_to_speech(Config.TTS_MODEL, tts_api_key, message, filename, Config.LOCAL_MODEL_PATH)
    play_audio(filename)
    delete_file(filename)

def main():
    """
    Main function to run the voice assistant conversation.
    """
    tts_api_key = get_tts_api_key()

    # Client starts the call
    client_message = "I am Anil, I need twenty nuts and bolts."
    client_file = "client.mp3"
    process_client_speech(message=client_message,
                          filename=client_file,
                          tts_api_key=tts_api_key)

    # Assistant responds with welcome
    welcome_message = """I am a vendor sourcing agent from Amexus AI, specializing in reverse bidding for purchasing products at minimum prices. My job is to understand requirements from users, contact vendors, and negotiate the best deal."""
    convert_tts(message=welcome_message,
                filename="welcome.mp3",
                tts_api_key=tts_api_key)

    # Searching vendors
    searching_message = "I am looking for reliable vendors of high-quality nuts and bolts in your area."
    convert_tts(message=searching_message,
                filename="search.mp3",
                tts_api_key=tts_api_key)

    # Inform client about progress
    get_info = """I have found vendors for nuts and bolts in your area. Now I will contact each vendor one by one to get complete information about nuts and bolts and their prices. Soon I will provide you with the best deal information!"""
    convert_tts(message=get_info,
                filename="info.mp3",
                tts_api_key=tts_api_key)

    # Call Vendor 1
    first_vendor_message = "Hello Amit, I need twenty nuts and bolts. Can you provide details about the nuts and bolts and the price per unit? Please share the information as soon as possible."
    convert_tts(message=first_vendor_message,
                filename="first_vendor.mp3",
                tts_api_key=tts_api_key,
                speaker="Assistant")

    vendor_1_speak_message = """I can provide twenty nuts and bolts.

    Type: Hex nuts and bolts

    Material: Stainless Steel

    Price per unit: Ten rupees

    Total price (for twenty units): Two hundred rupees"""
    vendor_one_text_to_speech(message=vendor_1_speak_message,
                              filename="vendor_1_speak.mp3",
                              tts_api_key=tts_api_key)

    first_vendor_thankyou_message = "Thank you, Amit! Have a good day."
    convert_tts(message=first_vendor_thankyou_message,
                filename="first_vendor_thankyou.mp3",
                tts_api_key=tts_api_key)

    # Call Vendor 2
    second_vendor_message = "Hello Bhagyesh, I need twenty nuts and bolts. Can you share details about the nuts and bolts and the price per unit? Please provide the information as soon as possible."
    convert_tts(message=second_vendor_message,
                filename="second_vendor.mp3",
                tts_api_key=tts_api_key,
                speaker="Assistant")

    vendor_2_speak_message = """I can provide twenty nuts and bolts.

    Type: Hex nuts and bolts

    Material: Stainless Steel

    Price per unit: Eight rupees

    Total price (for twenty units): One hundred sixty rupees"""
    vendor_two_text_to_speech(message=vendor_2_speak_message,
                              filename="vendor_2_speak.mp3",
                              tts_api_key=tts_api_key)

    second_vendor_thankyou_message = "Thank you, Bhagyesh! Have a good day."
    convert_tts(message=second_vendor_thankyou_message,
                filename="second_vendor_thankyou.mp3",
                tts_api_key=tts_api_key)

    # Assistant explains reverse bidding
    reverse_bidding_message = "I am using reverse bidding technique to select the best vendor for nuts and bolts, to ensure you get the best quality and price."
    convert_tts(message=reverse_bidding_message,
                filename="reverse_bidding.mp3",
                tts_api_key=tts_api_key)

    # Assistant informs client
    confirmation_message = "I have found the best vendor for nuts and bolts. Now I am calling the vendor to inform them that they will be supplying the nuts. I will send you all the details soon!"
    convert_tts(message=confirmation_message,
                filename="confirmation.mp3",
                tts_api_key=tts_api_key)

    # Call winning vendor again
    second_vendor_message2 = "Hello Bhagyesh, please start the process of sending the nuts and bolts. If there is any additional information or updates, please inform me immediately. Thank you!"
    convert_tts(message=second_vendor_message2,
                filename="vendor2.mp3",
                tts_api_key=tts_api_key)

    # Final message to client
    client_message = "Hello Anil, I have found a vendor named Bhagyesh for your nuts and bolts. He will soon supply the nuts and bolts as per your requirements. If there are any updates, I will inform you immediately. Thank you!"
    convert_tts(message=client_message,
                filename="return_client.mp3",
                tts_api_key=tts_api_key,
                speaker="Assistant")

if __name__ == "__main__":
    main()
