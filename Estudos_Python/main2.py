import pandas as pd 
from pymysql import create_engine 
caminho_csv = pd.read_csv("C:\Users\davyd\Downloads\archive\exec_orc_estados")
df = pd.read_csv(caminho_csv)
df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
print(caminho_csv)