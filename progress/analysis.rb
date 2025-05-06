import pandas as pd

# Load dataset
df = pd.read_csv('Marketing Team Data.csv')

# Calculate metrics if not already present
df['CTR'] = (df['Clicks'] / df['Impressions']) * 100
df['Unique CTR'] = (df['Unique Clicks'] / df['Impressions']) * 100
df['CPC'] = df['Amount Spent in INR'] / df['Clicks']
df['CPR'] = df['Amount Spent in INR'] / df['Unique Link Clicks (ULC)']

# Identify campaigns with low CTR, high CPC, or high frequency
low_ctr = df[df['CTR'] < df['CTR'].mean()]
high_cpc = df[df['CPC'] > df['CPC'].mean()]
high_frequency = df[df['Frequency'] > 3]

# Combine criteria to find underperforming campaigns
underperforming = df[(df['CTR'] < df['CTR'].mean()) & 
                     (df['CPC'] > df['CPC'].mean()) & 
                     (df['Frequency'] > 3)]

print(underperforming)