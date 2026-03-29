/**
 * Data Quest - Questions Database
 * 10 Levels × 3 Sections × 8-9 Questions = ~250 Questions
 * Each answer unlocks hint for next question
 */

const GAME_QUESTIONS = {
  // Level 1: Python Basics for Data Science
  1: {
    name: "Python Basics",
    sections: {
      basic: [
        {
          question: "What function is used to display output in Python?",
          options: ["print()", "echo()", "display()", "output()"],
          correct: 0,
          hint: "This function's name starts with 'p' and is used to 'print' text to the screen",
          nextHint: "It's the most basic output function - like saying something out loud"
        },
        {
          question: "Which data type is used to store whole numbers in Python?",
          options: ["float", "int", "str", "bool"],
          correct: 1,
          hint: "Think 'integer' - a number without decimals",
          nextHint: "It's short for 'integer' and represents counting numbers"
        },
        {
          question: "What symbol is used for single-line comments in Python?",
          options: ["//", "#", "/*", "--"],
          correct: 1,
          hint: "It's a hash/pound symbol that looks like a tic-tac-toe grid",
          nextHint: "Use this symbol to write notes that Python ignores"
        },
        {
          question: "How do you create a list in Python?",
          options: ["(1, 2, 3)", "{1, 2, 3}", "[1, 2, 3]", "<1, 2, 3>"],
          correct: 2,
          hint: "Lists use square brackets like a box that holds multiple items",
          nextHint: "Think of square brackets [] as containers for your data"
        },
        {
          question: "What is the output of len([1, 2, 3, 4, 5])?",
          options: ["4", "5", "6", "Error"],
          correct: 1,
          hint: "len() counts how many items are in a list - count the numbers",
          nextHint: "Just count the items: 1, 2, 3, 4, 5... that's how many?"
        },
        {
          question: "Which operator is used for exponentiation (power) in Python?",
          options: ["^", "**", "//", "%%"],
          correct: 1,
          hint: "Two asterisks multiply a number by itself - like 2**3 = 8",
          nextHint: "Double star makes numbers grow exponentially"
        },
        {
          question: "What does the 'append()' method do to a list?",
          options: ["Removes last item", "Adds item at end", "Sorts the list", "Reverses the list"],
          correct: 1,
          hint: "Think of appending like adding a new page at the end of a book",
          nextHint: "It adds one item to the tail/end of the list"
        },
        {
          question: "How do you import the NumPy library with the alias 'np'?",
          options: ["import numpy as np", "include numpy as np", "require numpy as np", "load numpy as np"],
          correct: 0,
          hint: "Use 'import' to bring in libraries, 'as' to give them a nickname",
          nextHint: "The standard way is: import library_name as short_name"
        }
      ],
      intermediate: [
        {
          question: "What does np.array([1, 2, 3]) create?",
          options: ["A Python list", "A NumPy array", "A dictionary", "A tuple"],
          correct: 1,
          hint: "NumPy's main data structure - optimized for numerical computing",
          nextHint: "It's NumPy's fundamental object for fast math operations"
        },
        {
          question: "Which NumPy function creates an array of zeros?",
          options: ["np.empty()", "np.zeros()", "np.null()", "np.blank()"],
          correct: 1,
          hint: "Think about what 'zeros' would be called in NumPy",
          nextHint: "This function fills an array with the number 0"
        },
        {
          question: "What is the shape of np.array([[1,2,3], [4,5,6]])?",
          options: ["(3, 2)", "(2, 3)", "(6,)", "[2, 3]"],
          correct: 1,
          hint: "Count rows first, then columns - 2 rows, 3 columns",
          nextHint: "Shape returns (rows, columns) - there are 2 rows with 3 items each"
        },
        {
          question: "How do you access the element at row 1, column 2 in a 2D array?",
          options: ["array[1][2]", "array[2][1]", "array(1, 2)", "array.get(1, 2)"],
          correct: 0,
          hint: "NumPy uses zero-based indexing - [row][column] format",
          nextHint: "In Python, indexing starts at 0, so row 1 is actually the second row"
        },
        {
          question: "What does array.reshape(3, 4) do?",
          options: ["Creates new array", "Changes array shape", "Sorts array", "Filters array"],
          correct: 1,
          hint: "It reorganizes the same data into a different shape",
          nextHint: "Reshape maintains the data but changes how it's arranged"
        },
        {
          question: "Which NumPy function generates random numbers between 0 and 1?",
          options: ["np.random.rand()", "np.random.random()", "np.random.uniform()", "All of the above"],
          correct: 3,
          hint: "Multiple functions can generate random floats in [0,1)",
          nextHint: "rand(), random(), and uniform() can all do this with default params"
        },
        {
          question: "What is broadcasting in NumPy?",
          options: ["Sending data over network", "Expanding array dimensions", "Automatic array alignment", "Printing arrays"],
          correct: 2,
          hint: "It's how NumPy handles operations between arrays of different shapes",
          nextHint: "NumPy automatically makes arrays compatible for operations"
        },
        {
          question: "What does np.linspace(0, 10, 5) produce?",
          options: ["[0, 2, 4, 6, 8, 10]", "[0, 2.5, 5, 7.5, 10]", "[0, 1, 2, 3, 4]", "[1, 3, 5, 7, 9]"],
          correct: 1,
          hint: "linspace creates evenly spaced numbers including both endpoints",
          nextHint: "5 numbers from 0 to 10 inclusive, evenly spaced: 0, 2.5, 5, 7.5, 10"
        }
      ],
      advanced: [
        {
          question: "What is the difference between view and copy in NumPy?",
          options: ["View is faster", "View shares memory, copy doesn't", "Copy is read-only", "No difference"],
          correct: 1,
          hint: "A view looks at the same data; a copy creates new data",
          nextHint: "Modifying a view affects original; modifying a copy doesn't"
        },
        {
          question: "What does np.where(arr > 0, 1, 0) do?",
          options: ["Counts positive values", "Returns indices", "Conditional assignment", "Filters array"],
          correct: 2,
          hint: "It's like an if-else: if condition, use first value, else second",
          nextHint: "Where condition is True, put 1; where False, put 0"
        },
        {
          question: "How do you calculate the dot product of two arrays?",
          options: ["array1 * array2", "np.multiply(array1, array2)", "np.dot(array1, array2)", "array1.dot(array2)"],
          correct: 2,
          hint: "Dot product is matrix multiplication, not element-wise",
          nextHint: "np.dot() performs matrix/vector dot product multiplication"
        },
        {
          question: "What is vectorization in NumPy?",
          options: ["Creating vectors", "Converting loops to array operations", "Plotting vectors", "Reshaping arrays"],
          correct: 1,
          hint: "Replacing Python loops with fast C-optimized array operations",
          nextHint: "It makes code faster by operating on whole arrays at once"
        },
        {
          question: "What does np.save('data.npy', array) do?",
          options: ["Prints array", "Saves to text file", "Saves binary file", "Creates backup"],
          correct: 2,
          hint: "NumPy has its own binary format (.npy) for efficient storage",
          nextHint: "It saves the array in NumPy's native binary format"
        },
        {
          question: "Which is faster: Python list comprehension or NumPy array operations?",
          options: ["Always lists", "Always NumPy", "Depends on size", "They're equal"],
          correct: 2,
          hint: "NumPy excels with large arrays; Python may win with small data",
          nextHint: "For small arrays, Python overhead is minimal; for large, NumPy wins"
        },
        {
          question: "What does array.T do?",
          options: ["Converts to list", "Transposes array", "Truncates array", "Transforms array"],
          correct: 1,
          hint: "T stands for transpose - swaps rows and columns",
          nextHint: "Transpose flips the array over its diagonal"
        },
        {
          question: "What is the purpose of np.random.seed(42)?",
          options: ["Plants a seed", "Makes random reproducible", "Limits random range", "Speeds up random"],
          correct: 1,
          hint: "Setting a seed makes random numbers the same every time",
          nextHint: "Same seed = same random sequence (useful for reproducibility)"
        }
      ]
    }
  },
  
  // Level 2: Data Manipulation with Pandas
  2: {
    name: "Pandas Mastery",
    sections: {
      basic: [
        {
          question: "What is the primary data structure in Pandas for 2D data?",
          options: ["Series", "DataFrame", "Array", "List"],
          correct: 1,
          hint: "It's like an Excel spreadsheet - rows and columns",
          nextHint: "DataFrame is the 2D labeled data structure in Pandas"
        },
        {
          question: "How do you read a CSV file in Pandas?",
          options: ["pd.read_csv()", "pd.load_csv()", "pd.open_csv()", "pd.import_csv()"],
          correct: 0,
          hint: "The standard function starts with 'read_'",
          nextHint: "pd.read_csv('file.csv') loads CSV data into a DataFrame"
        },
        {
          question: "What does df.head() display?",
          options: ["Last 5 rows", "First 5 rows", "Column names", "Data shape"],
          correct: 1,
          hint: "Like looking at the 'head' of something - the beginning",
          nextHint: "head() shows the first 5 rows by default"
        },
        {
          question: "How do you select a single column named 'age' from DataFrame df?",
          options: ["df.age", "df['age']", "df.get('age')", "Both A and B"],
          correct: 3,
          hint: "Pandas allows both dot notation and bracket notation",
          nextHint: "df.age and df['age'] both work for column selection"
        },
        {
          question: "What function shows summary statistics of a DataFrame?",
          options: ["df.summary()", "df.info()", "df.describe()", "df.stats()"],
          correct: 2,
          hint: "This function 'describes' your data with mean, std, min, max",
          nextHint: "describe() gives count, mean, std, min, quartiles, max"
        },
        {
          question: "How do you check for missing values in a DataFrame?",
          options: ["df.missing()", "df.isnull()", "df.nan()", "df.empty()"],
          correct: 1,
          hint: "Check if values are 'null' (None/missing)",
          nextHint: "isnull() returns True where values are missing"
        },
        {
          question: "What does df.shape return?",
          options: ["Number of columns", "Number of rows", "(rows, columns)", "Data size in bytes"],
          correct: 2,
          hint: "Similar to NumPy - it's a tuple of dimensions",
          nextHint: "Returns (number of rows, number of columns)"
        },
        {
          question: "How do you drop rows with missing values?",
          options: ["df.remove_na()", "df.dropna()", "df.clean()", "df.fillna()"],
          correct: 1,
          hint: "Use 'drop' to remove and 'na' for not available/missing",
          nextHint: "dropna() removes rows containing any NaN values"
        }
      ],
      intermediate: [
        {
          question: "What is the difference between loc and iloc?",
          options: ["loc is faster", "iloc uses labels, loc uses integers", "loc uses labels, iloc uses integers", "No difference"],
          correct: 2,
          hint: "Remember: 'i' in iloc = integer position; loc = label",
          nextHint: "loc uses index labels; iloc uses 0-based integer positions"
        },
        {
          question: "How do you filter rows where 'age' > 25?",
          options: ["df[df.age > 25]", "df.where(age > 25)", "df.filter(age > 25)", "df.select(age > 25)"],
          correct: 0,
          hint: "Use boolean indexing - put the condition inside brackets",
          nextHint: "df[condition] filters rows where condition is True"
        },
        {
          question: "What does df.groupby('category') do?",
          options: ["Sorts by category", "Groups data by category", "Filters categories", "Creates categories"],
          correct: 1,
          hint: "It organizes data into groups based on unique values in that column",
          nextHint: "Groups rows that have the same value in 'category' column"
        },
        {
          question: "How do you merge two DataFrames on a common column?",
          options: ["df1.join(df2)", "df1.combine(df2)", "pd.merge(df1, df2)", "df1.append(df2)"],
          correct: 2,
          hint: "Like SQL JOIN - combine tables based on common values",
          nextHint: "pd.merge() is the standard way to join DataFrames"
        },
        {
          question: "What method sorts a DataFrame by column values?",
          options: ["df.order()", "df.arrange()", "df.sort_values()", "df.sort()"],
          correct: 2,
          hint: "Sorts the rows based on values in one or more columns",
          nextHint: "sort_values(by='column_name') sorts by that column"
        },
        {
          question: "How do you apply a function to every element in a column?",
          options: ["df.map()", "df.apply()", "df.transform()", "df.function()"],
          correct: 1,
          hint: "Apply a function along an axis of the DataFrame",
          nextHint: "apply() lets you pass a function to operate on data"
        },
        {
          question: "What does pd.concat() do?",
          options: ["Merges on columns", "Concatenates along axis", "Joins tables", "Filters data"],
          correct: 1,
          hint: "Concatenates pandas objects along a particular axis",
          nextHint: "Sticks DataFrames together along rows (axis=0) or columns (axis=1)"
        },
        {
          question: "How do you reset the index of a DataFrame?",
          options: ["df.reindex()", "df.reset_index()", "df.new_index()", "df.clear_index()"],
          correct: 1,
          hint: "Reset the index to default integer index",
          nextHint: "reset_index() makes a new default 0,1,2... index"
        }
      ],
      advanced: [
        {
          question: "What is the difference between merge() and join()?",
          options: ["merge is faster", "join works on index, merge on columns", "No difference", "join is for Series"],
          correct: 1,
          hint: "join() merges on indices; merge() is more flexible with columns",
          nextHint: "join() = index-based; merge() = column-based joining"
        },
        {
          question: "How do you pivot a DataFrame?",
          options: ["df.pivot()", "df.rotate()", "df.transpose()", "df.reshape()"],
          correct: 0,
          hint: "Reshape data from long to wide format",
          nextHint: "pivot() transforms rows into columns based on values"
        },
        {
          question: "What does df.pct_change() calculate?",
          options: ["Sum change", "Percentage change", "Count change", "Rank change"],
          correct: 1,
          hint: "Calculates the percentage change between current and prior element",
          nextHint: "pct_change() shows % difference from previous value"
        },
        {
          question: "How do you handle categorical data efficiently in Pandas?",
          options: ["Use strings", "Use category dtype", "Use integers", "Use objects"],
          correct: 1,
          hint: "astype('category') saves memory for repeated values",
          nextHint: "Category dtype stores unique values once, saving memory"
        },
        {
          question: "What is MultiIndex in Pandas?",
          options: ["Multiple DataFrames", "Hierarchical indexing", "Multiple columns", "Array index"],
          correct: 1,
          hint: "Multiple levels of indexing for higher-dimensional data",
          nextHint: "MultiIndex has multiple index levels for complex data"
        },
        {
          question: "How do you optimize DataFrame memory usage?",
          options: ["Use float64 always", "Downcast numeric types", "Add more RAM", "Delete columns"],
          correct: 1,
          hint: "Use smallest appropriate dtype - int8 instead of int64 when possible",
          nextHint: "Downcasting to smaller types (int8, float32) saves memory"
        },
        {
          question: "What does df.resample() do?",
          options: ["Changes sample size", "Time series resampling", "Random sampling", "Data shuffling"],
          correct: 1,
          hint: "Resample time-series data to regular frequency",
          nextHint: "resample() groups time data into periods (daily, monthly)"
        },
        {
          question: "How do you create a rolling window calculation?",
          options: ["df.window()", "df.rolling()", "df.slide()", "df.moving()"],
          correct: 1,
          hint: "Provide rolling window calculations for time series",
          nextHint: "rolling(n) creates a moving window of n periods"
        },
        {
          question: "What is the purpose of Categorical data type?",
          options: ["Better sorting", "Memory efficiency + performance", "Easier plotting", "Smaller files"],
          correct: 1,
          hint: "Two main benefits: saves memory and speeds up operations",
          nextHint: "Categories use less memory and are faster for groupby operations"
        }
      ]
    }
  }
};

// Make questions available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GAME_QUESTIONS };
}
