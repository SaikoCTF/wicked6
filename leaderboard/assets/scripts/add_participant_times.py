# Simple command-line script to prompt user for saiko CTF participant challenge times

import os
import json

# Get the directory of the current script
current_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the full path to the challenge time data file
data_path = os.path.join(current_dir, "data.json") #Need json version for easy python processing
js_data_path = os.path.join(current_dir, "data.js") #Write to js version as well for easy html use

#Function to read in the current data that exist and add challenge times for a new participant handle.
def main():
	
	#Ingest current set of data
	with open(data_path, "r") as data_file:
		data = json.load(data_file)
		challenges = data["challenges"]
		participants = data["participants"]

	#Holds all details entered by user to print for their confirmation later
	entered_info = []

	print("This is the script for inputting the participants time on each challenge.")

	# Prompt the user for the participant handle
	handle = input("Please enter participant handle: ")
	entered_info.append(f'Handle: {handle}')
	
	#Loop through each of the challenges to get participant timing input by user
	participant = {"handle": handle, "challenges": []} #Initialize participant dict with empty challenge info
	for challenge in challenges:
		# Prompt the user for the participant's challenge time
		# time = input(f'Enter {challenge["name"]} time (format mm:ss 04:32), leave blank if flag not gotten: ')
		time = input(f'Enter {challenge["name"]} time (max time {challenge["allowed_time"]}), leave blank if flag not gotten: ')
		if time:
			participant["challenges"].append({"id": challenge["id"], "time": time})
		entered_info.append(f'Challenge {challenge["name"]} time: {time}')

	#Add the details for the new participant to the existing list.
	participants.append(participant)	

	# Display the collected information
	print("\nThank you for providing your information! Please confirm the entered details are correct and in the correct format (time should be mm:ss)")
	for info in entered_info:
		print(info)

	#Have user confirm the info they entered is correct
	info_confirmed = input(f'If the info is correct press y if not press n: ')
	
	#If the info is confirmed to be correct write it both to json and js file if not rerun this function.
	if info_confirmed.lower() == "y":
		#print(json.dumps({"challenges": challenges, "participants": participants}, indent=4))

		#JSON file write
		with open(data_path, "w") as data_file:
			data_file.write(json.dumps({"challenges": challenges, "participants": participants}, indent=4))

		#JS file write needs the variable name prepended
		with open(js_data_path, "w") as js_data_file:
			js_data_file.write("data = ")
			js_data_file.write(json.dumps({"challenges": challenges, "participants": participants}, indent=4))
	else:
		main()

if __name__ == "__main__":
	main()
